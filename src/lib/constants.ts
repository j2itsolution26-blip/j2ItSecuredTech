/**
 * Static company facts and navigation structure.
 *
 * Values here act as the fallback layer for `SiteSetting` records — an
 * administrator can override contact details at runtime without a redeploy.
 */
export const COMPANY_INFO = {
  name: 'J2 SecureTech',
  legalName: 'J2 SecureTech IT Solutions Inc.',
  tagline: 'Secure. Build. Connect.',
  description:
    'J2 SecureTech is an enterprise IT solutions provider specialising in custom software development, web and e-commerce platforms, CCTV and biometric security, structured cabling, network infrastructure and cloud services for modern businesses.',
  shortDescription:
    'Enterprise software, secure networks and surveillance infrastructure — engineered, installed and maintained by one accountable team.',
  founded: 2016,
  phone: '+63 (02) 8888-5273',
  phoneAlt: '+63 917 123 4567',
  email: 'info@j2securetech.com',
  salesEmail: 'sales@j2securetech.com',
  supportEmail: 'support@j2securetech.com',
  careersEmail: 'careers@j2securetech.com',
  address: 'Suite 1204, Enterprise Cyber Tower, Tech Hub District, Metro Manila, Philippines',
  addressParts: {
    street: 'Suite 1204, Enterprise Cyber Tower',
    locality: 'Metro Manila',
    region: 'NCR',
    postalCode: '1605',
    country: 'PH',
  },
  geo: { latitude: 14.5547, longitude: 121.0244 },
  mapQuery: 'Enterprise Cyber Tower, Metro Manila, Philippines',
  hours: 'Monday – Friday: 8:00 AM – 6:00 PM PHT',
  hoursDetailed: [
    { days: 'Monday – Friday', time: '8:00 AM – 6:00 PM' },
    { days: 'Saturday', time: '9:00 AM – 1:00 PM' },
    { days: 'Sunday & Holidays', time: 'Emergency support only' },
  ],
  emergencyNote: '24/7 emergency response is included with every Annual Maintenance Contract.',
  keywords: [
    'Enterprise Software Development',
    'Custom Business Systems',
    'Website Development Philippines',
    'E-Commerce Development',
    'CCTV Installation Philippines',
    'Biometric Systems',
    'Network Infrastructure',
    'Structured Cabling',
    'Fiber Optic Installation',
    'IT Solutions Philippines',
    'Cloud Solutions',
    'IT Consultancy',
  ],
  social: {
    facebook: 'https://facebook.com/j2securetech',
    linkedin: 'https://linkedin.com/company/j2securetech',
    twitter: 'https://twitter.com/j2securetech',
    github: 'https://github.com/j2securetech',
  },
} as const;

export type NavLink = {
  label: string;
  href: string;
  description?: string;
  children?: { label: string; href: string; description: string; icon: string }[];
};

export const NAV_LINKS: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  {
    label: 'Services',
    href: '/services',
    children: [
      {
        label: 'Software Development',
        href: '/services/software-development',
        description: 'ERP, POS, HRMS and bespoke line-of-business systems',
        icon: 'Code2',
      },
      {
        label: 'Website Development',
        href: '/services/website-development',
        description: 'Corporate sites, web apps and e-commerce platforms',
        icon: 'Globe',
      },
      {
        label: 'CCTV Installation',
        href: '/services/cctv-installation',
        description: 'IP surveillance, biometrics and access control',
        icon: 'ShieldCheck',
      },
      {
        label: 'Network Infrastructure',
        href: '/services/network-infrastructure',
        description: 'Fiber, structured cabling, Wi-Fi and firewalls',
        icon: 'Network',
      },
    ],
  },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Industries', href: '/industries' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

export const FOOTER_NAV = {
  services: [
    { label: 'Enterprise Software', href: '/services/software-development' },
    { label: 'Website & E-Commerce', href: '/services/website-development' },
    { label: 'CCTV & Biometrics', href: '/services/cctv-installation' },
    { label: 'Network Infrastructure', href: '/services/network-infrastructure' },
    { label: 'All Services', href: '/services' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Industries', href: '/industries' },
    { label: 'Testimonials', href: '/testimonials' },
    { label: 'Careers', href: '/careers' },
    { label: 'Blog', href: '/blog' },
  ],
  support: [
    { label: 'Contact', href: '/contact' },
    { label: 'Request a Quote', href: '/request-quote' },
    { label: 'FAQs', href: '/faqs' },
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
} as const;

export const STATS = [
  { value: 250, suffix: '+', label: 'Enterprise projects delivered' },
  { value: 99.9, suffix: '%', label: 'Infrastructure uptime SLA', decimals: 1 },
  { value: 120, suffix: '+', label: 'Active corporate clients' },
  { value: 15, suffix: '+', label: 'Years of combined expertise' },
] as const;

export const TRUSTED_SECTORS = [
  { name: 'Government & LGUs', icon: 'Landmark' },
  { name: 'Healthcare Networks', icon: 'Stethoscope' },
  { name: 'Universities', icon: 'GraduationCap' },
  { name: 'Hospitality Groups', icon: 'Hotel' },
  { name: 'Retail Chains', icon: 'ShoppingBag' },
  { name: 'Logistics & Warehousing', icon: 'Boxes' },
  { name: 'Manufacturing', icon: 'Factory' },
  { name: 'Construction', icon: 'Building2' },
] as const;

/** Differentiators rendered on the home page and About page. */
export const VALUE_PROPS = [
  {
    title: 'Single accountable partner',
    description:
      'Software, cabling, surveillance and cloud delivered by one team — no finger-pointing between vendors when something needs fixing.',
    icon: 'ShieldCheck',
  },
  {
    title: 'Engineering-led delivery',
    description:
      'Certified engineers scope every project on site. Designs are documented, reviewed and handed over with as-built drawings.',
    icon: 'Cpu',
  },
  {
    title: 'Enterprise security posture',
    description:
      'Role-based access, encrypted transport, audit trails and hardened firewalls are standard on every deployment we ship.',
    icon: 'Lock',
  },
  {
    title: 'Measured performance',
    description:
      'We commit to written SLAs — 95+ Lighthouse scores on web builds and four-hour response windows on maintenance contracts.',
    icon: 'Gauge',
  },
  {
    title: 'Procurement ready',
    description:
      'Complete bid documentation, warranty terms and compliance paperwork for government and institutional tenders.',
    icon: 'FileCheck',
  },
  {
    title: 'Support that continues',
    description:
      'Annual maintenance contracts cover preventive checks, patching, backup verification and emergency dispatch.',
    icon: 'Headset',
  },
] as const;

export const DELIVERY_PROCESS = [
  {
    step: '01',
    title: 'Discovery & site survey',
    description:
      'We audit your existing systems, interview stakeholders and survey the premises to establish real constraints before any design work begins.',
  },
  {
    step: '02',
    title: 'Architecture & proposal',
    description:
      'You receive a documented solution architecture, bill of materials, delivery schedule and fixed commercial proposal.',
  },
  {
    step: '03',
    title: 'Build & integration',
    description:
      'Development runs in two-week increments with staging access, while field teams execute cabling and hardware installation to schedule.',
  },
  {
    step: '04',
    title: 'Testing & handover',
    description:
      'Acceptance testing, security review, staff training and as-built documentation are completed before sign-off.',
  },
  {
    step: '05',
    title: 'Support & optimisation',
    description:
      'Maintenance contracts cover monitoring, patching, preventive servicing and a guaranteed response window.',
  },
] as const;

/** Fallback service taxonomy used by the quote form's service selector. */
export const SERVICE_OPTIONS = [
  'Enterprise Software Development',
  'ERP / CRM Implementation',
  'POS & Inventory System',
  'Payroll & HRMS',
  'School Management System',
  'Hospital Management System',
  'Warehouse Management System',
  'Corporate Website Development',
  'E-Commerce Platform',
  'Booking & Reservation System',
  'CCTV Supply & Installation',
  'Biometric & Access Control',
  'Structured Cabling & LAN',
  'Fiber Optic Installation',
  'Server Room & Rack Setup',
  'Enterprise Wi-Fi Solution',
  'Firewall & Network Security',
  'Cloud Migration & Hosting',
  'IT Consultancy',
  'Annual Maintenance Contract',
  'Other / Not listed',
] as const;

export const CERTIFICATIONS = [
  'ISO 27001 aligned processes',
  'Cisco certified network engineers',
  'Licensed electronics & communications engineers',
  'Manufacturer-authorised CCTV integrators',
  'Microsoft Azure & AWS trained architects',
] as const;
