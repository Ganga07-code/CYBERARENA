export const labs = [
  {
    id: 'sql-injection',
    title: 'SQL Injection',
    category: 'A03:2021 – Injection',
    risk: 'High',
    description: 'Observe a safe simulation of unsafe query construction and how parameterized queries prevent injection.',
    overview: 'The lab demonstrates how a vulnerable login form can be manipulated in an isolated demo database, then contrasts it with a secure implementation.'
  },
  {
    id: 'xss',
    title: 'Cross Site Scripting',
    category: 'A03:2021 – Injection',
    risk: 'High',
    description: 'See how untrusted input can alter a page inside a sandboxed demo environment.',
    overview: 'The lab highlights output encoding and a content security policy as defensive controls.'
  },
  {
    id: 'csrf',
    title: 'Cross Site Request Forgery',
    category: 'A05:2021 – Security Misconfiguration',
    risk: 'Medium',
    description: 'Visualize a forged request and understand why anti-CSRF protections matter.',
    overview: 'The lab explains SameSite cookies, anti-CSRF tokens, and same-origin policy.'
  },
  {
    id: 'brute-force',
    title: 'Brute Force Login Attack',
    category: 'A07:2021 – Identification and Authentication Failures',
    risk: 'High',
    description: 'Simulate repeated failed login attempts and see how rate limiting and MFA reduce impact.',
    overview: 'The demo shows how a system can slow attackers and protect accounts.'
  },
  {
    id: 'command-injection',
    title: 'Command Injection',
    category: 'A03:2021 – Injection',
    risk: 'High',
    description: 'Watch how unsafe shell execution can be dangerous in a protected simulation.',
    overview: 'The lab introduces allowlists and safe API alternatives.'
  },
  {
    id: 'directory-traversal',
    title: 'Directory Traversal',
    category: 'A01:2021 – Broken Access Control',
    risk: 'High',
    description: 'Explore fictional demo files to understand traversal attempts without touching real systems.',
    overview: 'The lab explains canonicalization, path validation, and least privilege.'
  },
  {
    id: 'clickjacking',
    title: 'Clickjacking',
    category: 'A05:2021 – Security Misconfiguration',
    risk: 'Medium',
    description: 'Inspect an iframe-based demo to see how a UI can be tricked into being clicked.',
    overview: 'The lab demonstrates frame protections and trusted UI policies.'
  },
  {
    id: 'file-upload',
    title: 'Insecure File Upload',
    category: 'A05:2021 – Security Misconfiguration',
    risk: 'High',
    description: 'Review how malicious uploads can be blocked using validation, scanning, and storage controls.',
    overview: 'The lab covers MIME checks, extension filtering, antivirus scanning, and secure storage.'
  },
  {
    id: 'broken-auth',
    title: 'Broken Authentication',
    category: 'A07:2021 – Identification and Authentication Failures',
    risk: 'High',
    description: 'Understand how weak session and credential handling creates risk.',
    overview: 'The lab explains short-lived tokens, rotation, and MFA.'
  },
  {
    id: 'weak-passwords',
    title: 'Weak Passwords',
    category: 'A07:2021 – Identification and Authentication Failures',
    risk: 'Medium',
    description: 'Test password strength patterns and see why complexity and breach checks matter.',
    overview: 'The lab demonstrates password policy, deny lists, and password managers.'
  },
  {
    id: 'session-hijacking',
    title: 'Session Hijacking',
    category: 'A07:2021 – Identification and Authentication Failures',
    risk: 'High',
    description: 'Simulate token theft awareness with secure session rotation and transport protections.',
    overview: 'The lab explains HttpOnly, Secure, SameSite, and session binding.'
  }
];
