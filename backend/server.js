const express = require('express');
const http = require('http');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Server } = require('socket.io');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const httpRequest = require('http');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST']
  }
});

app.use(helmet());
app.use(compression());
app.use(morgan('dev'));
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(express.json());

const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'cyberarena-dev-secret';

const labs = [
  {
    id: 'sql-injection',
    title: 'SQL Injection',
    category: 'A03:2021 – Injection',
    risk: 'High',
    description: 'Observe how string concatenation can alter queries in a simulated demo database.',
    overview: 'The lab explains how parameterized queries stop injection while preserving functionality.',
    steps: ['Introduction', 'Theory', 'Interactive demonstration', 'Detection', 'Defense'],
    mitigation: ['Use parameterized queries', 'Validate user input', 'Limit database permissions']
  },
  {
    id: 'xss',
    title: 'Cross Site Scripting',
    category: 'A03:2021 – Injection',
    risk: 'High',
    description: 'See how untrusted input can alter a page inside a sandboxed demo environment.',
    overview: 'The lab covers output encoding and Content Security Policy.',
    steps: ['Introduction', 'Theory', 'Interactive demonstration', 'Logs', 'Defense'],
    mitigation: ['Encode output', 'Use CSP', 'Sanitize user content']
  },
  {
    id: 'csrf',
    title: 'Cross Site Request Forgery',
    category: 'A05:2021 – Security Misconfiguration',
    risk: 'Medium',
    description: 'Visualize a forged request and understand why anti-CSRF protections matter.',
    overview: 'The lab explains SameSite cookies, anti-CSRF tokens, and origin checks.',
    steps: ['Introduction', 'Theory', 'Visual demo', 'Detection', 'Defense'],
    mitigation: ['Use anti-CSRF tokens', 'Set SameSite cookies', 'Verify origin headers']
  },
  {
    id: 'brute-force',
    title: 'Brute Force Login Attack',
    category: 'A07:2021 – Identification and Authentication Failures',
    risk: 'High',
    description: 'Simulate repeated failed login attempts and see how rate limiting and MFA reduce impact.',
    overview: 'The lab demonstrates account lockout and adaptive throttling.',
    steps: ['Introduction', 'Theory', 'Interactive demo', 'Logs', 'Defense'],
    mitigation: ['Rate limit requests', 'Enable MFA', 'Lock accounts after repeated failures']
  },
  {
    id: 'command-injection',
    title: 'Command Injection',
    category: 'A03:2021 – Injection',
    risk: 'High',
    description: 'Watch how unsafe shell execution can be dangerous in a protected simulation.',
    overview: 'The lab introduces allowlists and safe API alternatives.',
    steps: ['Introduction', 'Theory', 'Safe simulation', 'Detection', 'Defense'],
    mitigation: ['Avoid shell execution', 'Use allowlists', 'Call safe APIs']
  },
  {
    id: 'directory-traversal',
    title: 'Directory Traversal',
    category: 'A01:2021 – Broken Access Control',
    risk: 'High',
    description: 'Explore fictional demo files to understand traversal attempts without touching real systems.',
    overview: 'The lab explains canonicalization, path validation, and least privilege.',
    steps: ['Introduction', 'Theory', 'Visual demo', 'Logs', 'Defense'],
    mitigation: ['Normalize paths', 'Restrict access', 'Use sandboxed storage']
  },
  {
    id: 'clickjacking',
    title: 'Clickjacking',
    category: 'A05:2021 – Security Misconfiguration',
    risk: 'Medium',
    description: 'Inspect an iframe-based demo to see how a UI can be tricked into being clicked.',
    overview: 'The lab demonstrates frame protections and trusted UI policies.',
    steps: ['Introduction', 'Theory', 'Visual demo', 'Detection', 'Defense'],
    mitigation: ['Use X-Frame-Options', 'Use CSP frame-ancestors', 'Require user confirmation']
  },
  {
    id: 'file-upload',
    title: 'Insecure File Upload',
    category: 'A05:2021 – Security Misconfiguration',
    risk: 'High',
    description: 'Review how malicious uploads can be blocked using validation, scanning and storage controls.',
    overview: 'The lab covers MIME checks, extension filtering, and antivirus scanning.',
    steps: ['Introduction', 'Theory', 'Upload demo', 'Detection', 'Defense'],
    mitigation: ['Validate MIME type', 'Restrict extensions', 'Scan uploads']
  },
  {
    id: 'broken-auth',
    title: 'Broken Authentication',
    category: 'A07:2021 – Identification and Authentication Failures',
    risk: 'High',
    description: 'Understand how weak session and credential handling creates risk.',
    overview: 'The lab explains short-lived tokens, rotation, and MFA.',
    steps: ['Introduction', 'Theory', 'Session demo', 'Logs', 'Defense'],
    mitigation: ['Rotate sessions', 'Use MFA', 'Expire tokens quickly']
  },
  {
    id: 'weak-passwords',
    title: 'Weak Passwords',
    category: 'A07:2021 – Identification and Authentication Failures',
    risk: 'Medium',
    description: 'Test password policy patterns and see why complexity and breach checks matter.',
    overview: 'The lab demonstrates password policy and deny list enforcement.',
    steps: ['Introduction', 'Theory', 'Password demo', 'Detection', 'Defense'],
    mitigation: ['Enforce complexity', 'Block common passwords', 'Check breach databases']
  },
  {
    id: 'session-hijacking',
    title: 'Session Hijacking',
    category: 'A07:2021 – Identification and Authentication Failures',
    risk: 'High',
    description: 'Simulate token theft awareness with secure session rotation and transport protections.',
    overview: 'The lab explains HttpOnly, Secure, SameSite, and session binding.',
    steps: ['Introduction', 'Theory', 'Threat scenario', 'Logs', 'Defense'],
    mitigation: ['Use HttpOnly cookies', 'Rotate sessions', 'Bind to device context']
  }
];

const users = [];
const attackHistory = [];
const quizResults = [];
const achievements = [];
const certificates = [];
const dailyChallenges = [
  { id: 'challenge-1', title: 'Input Validation Sprint', description: 'Review one lab and explain how validation blocks abuse.', reward: 60, category: 'Injection' },
  { id: 'challenge-2', title: 'Session Hygiene Drill', description: 'Summarize one defensive control around tokens and cookies.', reward: 45, category: 'Authentication' }
];
const challengeCompletions = [];

function createToken(user) {
  return jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
}

function authenticate(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  if (!token) return res.status(401).json({ message: 'Authentication required.' });

  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token.' });
  }
}

function buildUserProfile(user) {
  const completedLabs = attackHistory.filter((entry) => entry.userId === user.id).length;
  const quizCount = quizResults.filter((entry) => entry.userId === user.id).length;
  const xp = 120 + completedLabs * 80 + quizCount * 25 + achievements.filter((entry) => entry.userId === user.id).length * 20;
  const level = Math.max(1, Math.floor(xp / 250) + 1);
  const streak = Math.max(1, Math.min(7, completedLabs + 1));
  const badges = [];
  if (completedLabs >= 3) badges.push('Lab Starter');
  if (quizCount >= 2) badges.push('Quiz Explorer');
  if (achievements.some((entry) => entry.userId === user.id)) badges.push('Defender');
  const strengths = [];
  const weakAreas = [];
  if (completedLabs >= 1) strengths.push('Input handling');
  if (quizCount >= 1) strengths.push('Defense reasoning');
  weakAreas.push('Authentication hardening');
  weakAreas.push('Secure configuration');

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    score: Math.min(100, 60 + completedLabs * 4 + quizCount * 4),
    completedLabs,
    xp,
    level,
    streak,
    badges,
    strengths,
    weakAreas,
    achievements: achievements.filter((entry) => entry.userId === user.id).map((entry) => entry.title),
    certificates: certificates.filter((entry) => entry.userId === user.id).length
  };
}

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'CyberArena backend', labs: labs.length });
});

app.post('/api/auth/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email and password are required.' });
  }

  const existing = users.find((user) => user.email.toLowerCase() === email.toLowerCase());
  if (existing) return res.status(409).json({ message: 'An account with this email already exists.' });

  const passwordHash = bcrypt.hashSync(password, 10);
  const user = { id: `user-${users.length + 1}`, name, email, passwordHash, role: 'student' };
  users.push(user);

  res.status(201).json({ token: createToken(user), user: buildUserProfile(user) });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find((entry) => entry.email.toLowerCase() === (email || '').toLowerCase());
  if (!user) return res.status(401).json({ message: 'Invalid credentials.' });
  const valid = bcrypt.compareSync(password || '', user.passwordHash);
  if (!valid) return res.status(401).json({ message: 'Invalid credentials.' });
  res.json({ token: createToken(user), user: buildUserProfile(user) });
});

app.get('/api/auth/me', authenticate, (req, res) => {
  const user = users.find((entry) => entry.id === req.user.id);
  if (!user) return res.status(404).json({ message: 'User not found.' });
  res.json(buildUserProfile(user));
});

app.get('/api/labs', (_req, res) => res.json(labs));

app.get('/api/labs/:labId', (req, res) => {
  const lab = labs.find((entry) => entry.id === req.params.labId);
  if (!lab) return res.status(404).json({ message: 'Lab not found.' });
  res.json(lab);
});

app.post('/api/history', authenticate, (req, res) => {
  const { labId } = req.body;
  attackHistory.push({ id: `history-${attackHistory.length + 1}`, userId: req.user.id, labId, createdAt: new Date().toISOString() });
  const achievementTitle = labId === 'sql-injection' ? 'SQL Master' : labId === 'xss' ? 'XSS Hunter' : 'Cyber Defender';
  if (!achievements.some((entry) => entry.userId === req.user.id && entry.title === achievementTitle)) {
    achievements.push({ id: `achievement-${achievements.length + 1}`, userId: req.user.id, title: achievementTitle });
  }
  res.json({ message: 'Lab progress recorded.', achievementTitle });
});

app.get('/api/dashboard', authenticate, (req, res) => {
  const user = users.find((entry) => entry.id === req.user.id);
  if (!user) return res.status(404).json({ message: 'User not found.' });
  const profile = buildUserProfile(user);
  const recentActivity = attackHistory.filter((entry) => entry.userId === req.user.id).slice(-5);
  res.json({
    user: profile,
    recentActivity,
    labsCompleted: recentActivity.length,
    attackHistory: attackHistory.filter((entry) => entry.userId === req.user.id).slice(-10),
    strengths: profile.strengths,
    weakAreas: profile.weakAreas,
    dailyChallenge: dailyChallenges[0]
  });
});

app.get('/api/leaderboard', (_req, res) => {
  const ranked = users.map((user) => ({ ...buildUserProfile(user), name: user.name })).sort((a, b) => b.score - a.score).slice(0, 10);
  res.json(ranked);
});

app.get('/api/achievements', authenticate, (req, res) => {
  res.json(achievements.filter((entry) => entry.userId === req.user.id));
});

app.post('/api/quiz', authenticate, (req, res) => {
  const { score, labId } = req.body;
  quizResults.push({ id: `quiz-${quizResults.length + 1}`, userId: req.user.id, labId, score });
  const feedback = score >= 1 ? 'Nice progress. You are beginning to connect the lab scenario to the correct defense.' : 'Review the mitigation guidance and try again to strengthen your understanding.';
  res.json({ message: 'Quiz recorded.', score, feedback });
});

app.get('/api/challenges/daily', authenticate, (_req, res) => {
  res.json(dailyChallenges[0]);
});

app.post('/api/challenges/complete', authenticate, (req, res) => {
  const { id } = req.body;
  challengeCompletions.push({ userId: req.user.id, challengeId: id, completedAt: new Date().toISOString() });
  res.json({ message: 'Daily challenge completed. You earned extra XP for your streak.' });
});

app.get('/api/reports/export', authenticate, (req, res) => {
  const user = users.find((entry) => entry.id === req.user.id);
  if (!user) return res.status(404).json({ message: 'User not found.' });
  const profile = buildUserProfile(user);
  const report = `CyberArena Learning Report\nName: ${profile.name}\nScore: ${profile.score}\nLevel: ${profile.level}\nXP: ${profile.xp}\nStreak: ${profile.streak}\nStrengths: ${profile.strengths.join(', ')}\nFocus Areas: ${profile.weakAreas.join(', ')}`;
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Content-Disposition', 'attachment; filename=cyberarena-learning-report.txt');
  res.send(report);
});

app.post('/api/certificates', authenticate, (req, res) => {
  const user = users.find((entry) => entry.id === req.user.id);
  if (!user) return res.status(404).json({ message: 'User not found.' });
  const existing = certificates.find((entry) => entry.userId === req.user.id);
  if (!existing) {
    certificates.push({ id: `certificate-${certificates.length + 1}`, userId: req.user.id, issuedAt: new Date().toISOString() });
  }
  res.json({ message: 'Certificate issued.', certificate: certificates.find((entry) => entry.userId === req.user.id) });
});

app.post('/api/ai/assist', (req, res) => {
  const { question } = req.body;
  const prompt = (question || '').toLowerCase();
  const fallback = {
    sql: 'SQL injection happens when untrusted input changes the meaning of a SQL query. Use parameterized queries and least-privileged database accounts.',
    xss: 'Cross-site scripting injects script into a web page. Escape output and enforce a strict Content Security Policy.',
    csrf: 'CSRF tricks a browser into sending a state-changing request. Protect it with anti-CSRF tokens and SameSite cookies.',
    jwt: 'JWTs carry identity claims in a signed token. Verify signatures, keep them short-lived, and avoid storing secrets in the client.',
    hashing: 'Hashing is one-way transformation used for password storage. Use a slow algorithm like bcrypt or Argon2.',
    encryption: 'Encryption protects data in transit or at rest. Use TLS for transport and strong key management for storage.'
  };

  let answer = 'CyberArena teaches these topics through safe, isolated simulations. Ask about SQL injection, XSS, CSRF, JWT, hashing, or encryption.';
  for (const [key, value] of Object.entries(fallback)) {
    if (prompt.includes(key)) {
      answer = value;
      break;
    }
  }

  const aiServiceUrl = process.env.AI_SERVICE_URL || 'http://127.0.0.1:8000/ask';
  const payload = JSON.stringify({ question });
  const options = {
    hostname: new URL(aiServiceUrl).hostname,
    port: new URL(aiServiceUrl).port || 80,
    path: new URL(aiServiceUrl).pathname,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(payload)
    }
  };

  const request = httpRequest.request(options, (response) => {
    let body = '';
    response.on('data', (chunk) => { body += chunk; });
    response.on('end', () => {
      if (response.statusCode && response.statusCode < 400) {
        try {
          const parsed = JSON.parse(body);
          return res.json({ answer: parsed.answer || answer });
        } catch (error) {
          return res.json({ answer });
        }
      }
      return res.json({ answer });
    });
  });

  request.on('error', () => res.json({ answer }));
  request.write(payload);
  request.end();
});

io.on('connection', (socket) => {
  socket.emit('welcome', { message: 'Connected to CyberArena live telemetry.' });
  socket.on('join-room', (room) => socket.join(room));
});

if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB Atlas.'))
    .catch((error) => console.error('MongoDB connection failed:', error.message));
} else {
  console.log('MongoDB URI not provided. Using in-memory demo storage.');
}

server.listen(PORT, () => {
  console.log(`CyberArena backend listening on port ${PORT}`);
});
