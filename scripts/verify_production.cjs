const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const ARTIFACT_DIR = 'C:\\Users\\HP\\.gemini\\antigravity\\brain\\95ea7cbf-5d4d-4e9e-9880-360030502a06';
const PORT = 4173;

async function run() {
  console.log('--- Starting Chrome Production Verification ---');
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless',
    '--disable-gpu',
    '--remote-debugging-port=9229',
    '--window-size=1440,900'
  ]);

  await new Promise(r => setTimeout(r, 1200));

  let targets;
  try {
    targets = await new Promise((resolve, reject) => {
      http.get('http://127.0.0.1:9229/json', res => {
        let d = '';
        res.on('data', c => d += c);
        res.on('end', () => resolve(JSON.parse(d)));
      }).on('error', reject);
    });
  } catch (err) {
    console.error('Failed to connect to Chrome debug port:', err);
    chrome.kill();
    process.exit(1);
  }

  const ws = new WebSocket(targets[0].webSocketDebuggerUrl);
  let id = 1;
  const send = (method, params = {}) => new Promise(res => {
    const msgId = id++;
    const h = evt => {
      const d = JSON.parse(evt.data);
      if (d.id === msgId) {
        ws.removeEventListener('message', h);
        res(d.result);
      }
    };
    ws.addEventListener('message', h);
    ws.send(JSON.stringify({ id: msgId, method, params }));
  });

  await new Promise(r => ws.onopen = r);

  const consoleErrors = [];
  const networkErrors = [];

  ws.addEventListener('message', evt => {
    const d = JSON.parse(evt.data);
    if (d.method === 'Runtime.consoleAPICalled') {
      if (d.params.type === 'error' || d.params.type === 'warning') {
        const text = d.params.args.map(a => a.value || a.description || '').join(' ');
        consoleErrors.push(`[${d.params.type.toUpperCase()}] ${text}`);
      }
    } else if (d.method === 'Runtime.exceptionThrown') {
      consoleErrors.push(`[EXCEPTION] ${d.params.exceptionDetails.text} ${d.params.exceptionDetails.exception?.description || ''}`);
    } else if (d.method === 'Network.responseReceived') {
      const resp = d.params.response;
      if (resp.status >= 400) {
        networkErrors.push(`[HTTP ${resp.status}] ${resp.url}`);
      }
    }
  });

  await send('Page.enable');
  await send('Runtime.enable');
  await send('Network.enable');

  // --- 1. DESKTOP VIEWPORT TEST (1440x900) ---
  console.log('\n--- 1. Testing Desktop Viewport (1440x900) ---');
  await send('Emulation.setDeviceMetricsOverride', {
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false
  });

  await send('Page.navigate', { url: `http://127.0.0.1:${PORT}/` });
  await new Promise(r => setTimeout(r, 2000));

  // Check horizontal overflow
  const desktopOverflow = await send('Runtime.evaluate', {
    expression: 'document.documentElement.scrollWidth > window.innerWidth'
  });
  console.log('Desktop Horizontal Overflow:', desktopOverflow.result.value ? 'FAIL (overflow detected)' : 'PASS (no overflow)');

  // Take Desktop Screenshot
  const desktopScreenshot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(ARTIFACT_DIR, 'prod_desktop_verification.png'), Buffer.from(desktopScreenshot.data, 'base64'));
  console.log('Saved prod_desktop_verification.png');

  // Test Modal Lazy Loading (click Book a Consultation button)
  console.log('\n--- 2. Testing Modal Lazy Loading & Execution ---');
  const clickResult = await send('Runtime.evaluate', {
    expression: `(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => (b.innerText || '').includes('Book a Consultation') || (b.innerText || '').includes('Schedule Consultation') || (b.innerText || '').includes('Consultation'));
      if (btn) {
        btn.click();
        return { clicked: true, text: btn.innerText.trim() };
      }
      return { clicked: false };
    })()`,
    returnByValue: true
  });
  console.log('Button click result:', clickResult.result.value);
  await new Promise(r => setTimeout(r, 1200));

  const modalRendered = await send('Runtime.evaluate', {
    expression: 'document.body.innerText.includes("Schedule a Consultation") || document.body.innerText.includes("Chambers of Adv. Muhammad Ajmal KTV")',
    returnByValue: true
  });
  console.log('Consultation Modal dynamically loaded & rendered:', modalRendered.result.value ? 'PASS' : 'FAIL');

  // Take screenshot of opened modal
  const modalScreenshot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(ARTIFACT_DIR, 'prod_modal_verification.png'), Buffer.from(modalScreenshot.data, 'base64'));
  console.log('Saved prod_modal_verification.png');

  // Close modal via Escape
  await send('Runtime.evaluate', {
    expression: `window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', code: 'Escape', bubbles: true }))`
  });
  await new Promise(r => setTimeout(r, 500));

  // --- 3. MOBILE VIEWPORT TEST (390x844) ---
  console.log('\n--- 3. Testing Mobile Viewport (390x844) ---');
  await send('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true
  });

  await send('Page.navigate', { url: `http://127.0.0.1:${PORT}/` });
  await new Promise(r => setTimeout(r, 2000));

  const mobileOverflow = await send('Runtime.evaluate', {
    expression: 'document.documentElement.scrollWidth > window.innerWidth'
  });
  console.log('Mobile Horizontal Overflow:', mobileOverflow.result.value ? 'FAIL (overflow detected)' : 'PASS (no overflow)');

  // Take Mobile Screenshot
  const mobileScreenshot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(ARTIFACT_DIR, 'prod_mobile_verification.png'), Buffer.from(mobileScreenshot.data, 'base64'));
  console.log('Saved prod_mobile_verification.png');

  // --- 4. VERIFY CONSOLE AND NETWORK ---
  console.log('\n--- 4. Console & Network Summary ---');
  if (consoleErrors.length === 0) {
    console.log('✓ Console Errors / React Warnings: 0 (CLEAN)');
  } else {
    console.log(`✗ Found ${consoleErrors.length} console issue(s):`);
    consoleErrors.forEach(e => console.log('  ', e));
  }

  if (networkErrors.length === 0) {
    console.log('✓ Network 4xx/5xx Errors: 0 (ALL ASSETS LOADED SUCCESSFULLY)');
  } else {
    console.log(`✗ Found ${networkErrors.length} network error(s):`);
    networkErrors.forEach(e => console.log('  ', e));
  }

  chrome.kill();
  console.log('\nVerification complete.');
  process.exit(0);
}

run().catch(err => {
  console.error('Fatal error during verification:', err);
  process.exit(1);
});
