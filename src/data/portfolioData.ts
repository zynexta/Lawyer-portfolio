import { PracticeArea, CaseStudy, Testimonial, Article, StatItem } from '../types';

export const statsData: StatItem[] = [
  {
    value: '8+',
    label: 'Years of Practice',
    sublabel: 'Active High Court Litigation',
    icon: 'wreath',
  },
  {
    value: '500+',
    label: 'Cases Handled',
    sublabel: 'Criminal, Civil, Property & Family',
    icon: 'briefcase',
  },
  {
    value: '95%',
    label: 'Client Satisfaction',
    sublabel: 'Verified Court Decrees & Settlements',
    icon: 'scales',
  },
];

export const practiceAreasData: PracticeArea[] = [
  {
    id: 'civil-property-law',
    number: '01',
    title: 'Civil & Property Law',
    subtitle: 'Disputes, Possession & Ownership',
    description: 'Title verification, partition suits, recovery of possession, boundary disputes, injunctions, and property registration litigation.',
    extendedDescription: 'Comprehensive property litigation and civil advocacy before Civil Courts and the High Court of Kerala. From pre-purchase title due diligence, declaration of title, partition among co-owners, easement rights, to urgent prohibitory injunctions protecting lawful possession.',
    iconName: 'scales',
    keyServices: [
      'Property Title Search & Comprehensive Due Diligence',
      'Partition Suits & Ancestral Property Division',
      'Suit for Declaration of Title, Possession & Injunction',
      'Boundary & Easement Rights Litigation',
      'Specific Performance of Real Estate Contracts',
    ],
  },
  {
    id: 'criminal-law',
    number: '02',
    title: 'Criminal Law',
    subtitle: 'Defense, Bail & Legal Remedies',
    description: 'Trial defence across Sessions and Magistrate courts, regular and anticipatory bail, NDPS, POCSO, and Section 482 quashing.',
    extendedDescription: 'Formidable criminal defense representation with strategic courtroom cross-examinations and deep precedent research. Protecting constitutional liberty before Special Sessions Courts and the High Court of Kerala.',
    iconName: 'briefcase',
    keyServices: [
      'High Court Anticipatory Bail & Regular Bail (BNSS / CrPC)',
      'Sessions Court Trial Cross-Examinations & Defense Arguments',
      'NDPS Act Strict Bail & Procedural Compliance Defense',
      'POCSO Act Sensitive Defense & Child Rights Safeguards',
      'Section 482 Quashing Petitions Before High Court',
    ],
  },
  {
    id: 'family-law',
    number: '03',
    title: 'Family Law',
    subtitle: 'Marriage, Divorce & Custody',
    description: 'Divorce proceedings, child custody battles, spousal and child maintenance, domestic violence protection, and confidential mediation.',
    extendedDescription: 'Compassionate, discreet, and legally decisive counsel before Family Courts across Kerala. Safeguarding client dignity and parental rights while resolving matrimonial conflicts efficiently.',
    iconName: 'users',
    keyServices: [
      'Mutual Consent & Contested Divorce Proceedings',
      'Child Custody, Guardianship & Visitation Rights',
      'Interim & Permanent Maintenance (Sec. 125 CrPC / HMA)',
      'Domestic Violence Act (DV) Defense & Applications',
      'Pre-Litigation Family Mediation & Settlement Agreements',
    ],
  },
  {
    id: 'corporate-legal-advisory',
    number: '04',
    title: 'Corporate Legal Advisory',
    subtitle: 'Business, Contracts & Compliance',
    description: 'Commercial contract drafting, partnership deeds, statutory compliance, breach of contract litigation, and business dispute settlement.',
    extendedDescription: 'Strategic legal counsel for entrepreneurs, partnerships, and growing corporations. Ensuring robust contractual protection, regulatory adherence, and swift dispute resolution.',
    iconName: 'file-text',
    keyServices: [
      'Commercial Contract & Master Service Agreement Drafting',
      'Partnership Deeds, Shareholder & Founder Agreements',
      'Section 138 NI Act Commercial Debt Recovery Notices',
      'Corporate Statutory Compliance & Regulatory Audits',
      'Pre-Institution Commercial Mediation & Arbitration',
    ],
  },
];

export const selectedCasesData: CaseStudy[] = [
  {
    id: 'case-legal-notice',
    category: 'Statutory Notice',
    title: 'Legal Notice',
    shortDescription: 'Formal statutory notices, rejoinders, and pre-litigation legal demands.',
    fullOverview: 'Preparation and issuance of formal legal notices, statutory rejoinders, and demand notices across civil, commercial, and financial disputes.',
    strategy: 'Precision legal drafting establishing statutory compliance and a strong cause of action before litigation.',
    outcome: 'Effective pre-litigation resolution and formalized legal claims.',
    jurisdiction: 'High Court of Kerala & Subordinate Courts',
  },
  {
    id: 'case-mediation',
    category: 'Dispute Resolution',
    title: 'Mediation',
    shortDescription: 'Alternative dispute resolution for consensual and binding legal settlements.',
    fullOverview: 'Representation in structured commercial, familial, and property mediation proceedings to achieve swift, cost-effective settlements.',
    strategy: 'Interest-based negotiation ensuring client rights are safeguarded without exhaustive court trials.',
    outcome: 'Enforceable compromise agreements and amicable resolutions.',
    jurisdiction: 'High Court Mediation Centre & DLSA',
  },
  {
    id: 'case-criminal-cases',
    category: 'Criminal Defense',
    title: 'Criminal Cases (NDPS, POCSO & All Types)',
    shortDescription: 'Trial and appellate criminal defense across specialized penal statutes.',
    fullOverview: 'Comprehensive defense in cases under the NDPS Act, POCSO Act, Indian Penal Code, and specialized criminal legislation.',
    strategy: 'Rigorous procedural scrutiny of investigative records, seizure protocols, and trial cross-examination.',
    outcome: 'Bail representation, trial defense, and criminal appeals.',
    jurisdiction: 'Special Sessions Courts & High Court of Kerala',
  },
  {
    id: 'case-family-cases',
    category: 'Family Law',
    title: 'Family Cases',
    shortDescription: 'Legal representation in matrimonial, maintenance, divorce, and custody proceedings.',
    fullOverview: 'Handling matrimonial disputes, divorce petitions, permanent alimony, interim maintenance, and child custody matters.',
    strategy: 'Balanced legal advocacy prioritizing client protection, child welfare, and equitable settlements.',
    outcome: 'Statutory protection decrees and dignified resolutions.',
    jurisdiction: 'Family Courts & High Court of Kerala',
  },
  {
    id: 'case-medical-legal',
    category: 'Healthcare Law',
    title: 'Medical Legal Cases',
    shortDescription: 'Clinical negligence claims, consumer disputes, and medico-legal advisory.',
    fullOverview: 'Representation in medical negligence allegations, consumer protection claims, and clinical liability controversies.',
    strategy: 'Thorough evaluation of medical records, standard-of-care guidelines, and expert medical testimony.',
    outcome: 'Decisive representation before Consumer Redressal Commissions and appellate bodies.',
    jurisdiction: 'Consumer Commissions & High Court of Kerala',
  },
  {
    id: 'case-cyber-crimes',
    category: 'Cyber Law',
    title: 'Cyber Crimes',
    shortDescription: 'Representation in digital fraud, IT Act offences, and electronic data disputes.',
    fullOverview: 'Defense and advisory in cyber financial fraud, unauthorized data access, digital identity theft, and IT Act violations.',
    strategy: 'Electronic evidentiary compliance, Section 65B certification, and digital forensic scrutiny.',
    outcome: 'Prompt legal intervention, asset freeze petitions, and courtroom defense.',
    jurisdiction: 'Special Cyber Crime Courts & High Court of Kerala',
  },
  {
    id: 'case-mact-cases',
    category: 'Motor Accidents',
    title: 'MACT Cases',
    shortDescription: 'Compensation claim petitions and litigation before Motor Accidents Claims Tribunals.',
    fullOverview: 'Prosecuting and defending compensation petitions for injury, permanent disability, and fatal accidents under the Motor Vehicles Act.',
    strategy: 'Detailed multiplier calculations, disability assessments, and evidentiary substantiation of financial loss.',
    outcome: 'Fair and maximized compensation awards before MACT tribunals.',
    jurisdiction: 'Motor Accidents Claims Tribunals (MACT)',
  },
];

export const credentialsData = [
  {
    title: 'Bachelor of Laws (LL.B.)',
    description: 'Qualified legal education',
    icon: 'graduation-cap',
  },
  {
    title: 'Practicing at the High Court',
    description: 'Focused on diverse legal matters',
    icon: 'landmark',
  },
  {
    title: 'Client-Centric Approach',
    description: 'Transparent, ethical, and result-driven',
    icon: 'shield-check',
  },
];

export const testimonialsData: Testimonial[] = [
  {
    id: 'testimonial-1',
    quote: 'We received clear guidance, strong legal support, and a favorable resolution to our case. Highly professional and approachable throughout the process.',
    clientRole: 'Client (Property Dispute Case)',
    caseType: 'Property Dispute Resolution',
    year: '2025',
  },
  {
    id: 'testimonial-2',
    quote: 'Adv. Ajmal handled our complex criminal trial with extraordinary dedication, razor-sharp courtroom cross-examination, and unwavering clarity. Truly exceptional advocate.',
    clientRole: 'Client (Criminal Defense Trial)',
    caseType: 'Criminal Defence Matter',
    year: '2025',
  },
  {
    id: 'testimonial-3',
    quote: 'Instead of years in court battles, Adv. Ajmal resolved our family property distribution through skilled mediation. Fair, transparent, and dignified.',
    clientRole: 'Client (Family Law Settlement)',
    caseType: 'Family Settlement & Partition',
    year: '2024',
  },
];

export const articlesData: Article[] = [
  {
    id: 'buying-property-guide',
    title: 'Key Things to Know Before Buying Property',
    excerpt: 'Essential legal checks including encumbrance certificates, title deed authenticity, and revenue verification before purchasing real estate in Kerala.',
    date: 'February 2026',
    readTime: '5 MIN READ',
    category: 'Property Law',
    image: '/article-gavel.webp',
    content: [
      'Purchasing real estate represents one of the most substantial financial decisions for individuals and businesses. Prior to executing any sale deed or paying advance amounts, thorough legal verification of the parent title deed across a minimum 30-year span is imperative.',
      'Always inspect the Encumbrance Certificate (EC) from the Sub-Registrar Office, verify land tax receipts, and ensure the property is free from prior mortgages, lis pendens attachments, or acquisition proceedings under the Land Acquisition Act.',
      'Engaging an experienced property advocate to draft or review the Agreement for Sale ensures strict penalty clauses, clear possession schedules, and statutory safeguards against defective titles.',
    ],
  },
  {
    id: 'bail-types-and-rights',
    title: 'Bail: Types, Process and Legal Rights',
    excerpt: 'Understanding regular bail, anticipatory bail, and default statutory bail protections under Indian criminal jurisprudence.',
    date: 'January 2026',
    readTime: '4 MIN READ',
    category: 'Criminal Law',
    image: '/article-pillars.webp',
    content: [
      'The foundational bedrock of Indian criminal law, reiterated continuously by the Supreme Court, is that bail is the rule and jail is the exception under Article 21 of the Constitution.',
      'Anticipatory bail protects individuals apprehending arrest in non-bailable offences, while regular bail applies once an individual is in judicial custody. Additionally, Default Bail under Section 167(2) CrPC / Section 187 BNSS is an indefeasible fundamental right if the police fail to file a final report within the statutory timeframe.',
      'A strategic bail application presents clear medical, social, and procedural grounds to demonstrate the accused is neither a flight risk nor capable of tampering with evidence.',
    ],
  },
  {
    id: 'civil-dispute-rights',
    title: 'Understanding Your Rights in a Civil Dispute',
    excerpt: 'Strategic roadmap for navigating civil litigation, temporary injunctions, statutory notices, and alternate dispute resolution.',
    date: 'December 2025',
    readTime: '6 MIN READ',
    category: 'Civil Law',
    image: '/article-books.webp',
    content: [
      'Civil litigation demands meticulous evidentiary preparation from the very first correspondence. Before instituting a suit, a structured statutory demand notice crystallizes the legal dispute and sets firm timelines.',
      'When an urgent threat to property or contractual rights arises, Order 39 of the Code of Civil Procedure empowers civil courts to grant ad-interim temporary injunctions to preserve the status quo.',
      'Modern civil practice increasingly combines assertive litigation with court-annexed mediation, often helping parties reach enforceable compromise decrees in months rather than decades.',
    ],
  },
];
