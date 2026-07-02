import { useEffect, useState } from 'react';
import { Routes, Route, Link, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, Bot, Trophy, FileText, LayoutDashboard, FlaskConical, ArrowRight, Sparkles, UserCircle, Cog, Compass, Award, Target, BrainCircuit, CalendarDays, BadgeCheck, Download, MessageCircle, BarChart3, ScrollText } from 'lucide-react';
import { labs } from './data/labs';
import { AuthProvider, useAuth } from './context/AuthContext';
import AuthForm from './components/AuthForm';
import LabPanel from './components/LabPanel';
import AdminPanel from './components/AdminPanel';
import ProtectedRoute from './components/ProtectedRoute';

const API_BASE = import.meta.env.VITE_API_BASE || '';

const navItems = [
  { to: '/', label: 'Home', icon: ShieldCheck },
  { to: '/about', label: 'About', icon: Compass },
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/roadmap', label: 'Roadmap', icon: Target },
  { to: '/labs', label: 'Attack Labs', icon: FlaskConical },
  { to: '/challenges', label: 'Challenges', icon: CalendarDays },
  { to: '/ai', label: 'AI Assistant', icon: Bot },
  { to: '/leaderboard', label: 'Leaderboard', icon: Trophy },
  { to: '/achievements', label: 'Achievements', icon: Award },
  { to: '/community', label: 'Community', icon: MessageCircle },
  { to: '/certificates', label: 'Certificates', icon: FileText },
  { to: '/profile', label: 'Profile', icon: UserCircle },
  { to: '/settings', label: 'Settings', icon: Cog }
];

function Layout({ children }) {
  const { user, logout } = useAuth();
  return (
    <div className="min-h-screen bg-bg text-slate-100">
      <header className="border-b border-slate-800/80 bg-slate-950/70 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <Link to="/" className="flex items-center gap-3 text-lg font-semibold">
            <div className="rounded-xl border border-blue-500/30 bg-blue-500/10 p-2">
              <ShieldCheck className="h-5 w-5 text-blue-400" />
            </div>
            <span>CyberArena</span>
          </Link>
          <nav className="hidden gap-2 md:flex">
            {navItems.map(({ to, label, icon: Icon }) => (
              <NavLink key={to} to={to} className={({ isActive }) => `flex items-center gap-2 rounded-full px-4 py-2 text-sm transition ${isActive ? 'bg-blue-500/20 text-blue-300' : 'text-slate-300 hover:bg-slate-800'}`}>
                <Icon className="h-4 w-4" />
                {label}
              </NavLink>
            ))}
            {user && <button onClick={logout} className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-300 hover:bg-slate-800">Logout</button>}
          </nav>
        </div>
      </header>
      {children}
    </div>
  );
}

function HomePage() {
  return (
    <main className="mx-auto flex max-w-7xl flex-col gap-16 px-6 py-16 lg:px-8">
      <section className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-sm text-blue-300">
            <Sparkles className="h-4 w-4" /> Safe educational simulations
          </div>
          <h1 className="text-4xl font-semibold leading-tight text-white sm:text-6xl">Learn web security through immersive, safe attack labs.</h1>
          <p className="max-w-2xl text-lg text-slate-300">CyberArena blends interactive simulations, live logs, and mitigation guidance to teach modern web attacks without ever touching real systems.</p>
          <div className="flex flex-wrap gap-4">
            <Link to="/labs" className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-500">Explore Labs <ArrowRight className="h-4 w-4" /></Link>
            <Link to="/ai" className="rounded-full border border-slate-700 px-5 py-3 font-medium text-slate-200 transition hover:border-purple-500 hover:text-purple-200">Ask the AI Mentor</Link>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-800 p-8 shadow-cyber">
          <div className="rounded-2xl border border-blue-500/30 bg-blue-500/10 p-4">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Live security posture</p>
                <p className="text-3xl font-semibold text-white">92/100</p>
              </div>
              <div className="rounded-full bg-green-500/15 px-3 py-1 text-sm text-green-400">Secure Demo</div>
            </div>
            <div className="space-y-3">
              {['SQL Injection Lab', 'XSS Sandbox', 'CSRF Defense'].map((item, index) => (
                <div key={item} className="flex items-center justify-between rounded-2xl border border-slate-700 bg-slate-900/70 px-4 py-3">
                  <span className="text-sm text-slate-300">{item}</span>
                  <span className="text-sm font-medium text-blue-300">0{index + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {[
          ['11+', 'Interactive labs'],
          ['24/7', 'AI-guided support'],
          ['100%', 'Safe simulations']
        ].map(([value, label]) => (
          <div key={label} className="rounded-2xl border border-slate-800 bg-card p-6">
            <p className="text-3xl font-semibold text-white">{value}</p>
            <p className="mt-2 text-sm text-slate-400">{label}</p>
          </div>
        ))}
      </section>

      <section className="space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-blue-300">Learning path</p>
            <h2 className="text-2xl font-semibold text-white">From beginner to defensive practitioner</h2>
          </div>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {['Foundations', 'Attack Simulation', 'Defense Implementation'].map((step, index) => (
            <motion.div key={step} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-2xl border border-slate-800 bg-card p-6">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/10 text-blue-300">0{index + 1}</div>
              <h3 className="text-lg font-semibold text-white">{step}</h3>
              <p className="mt-2 text-sm text-slate-400">Learn the technique, explore a visual simulation, and finish with secure coding guidance.</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-blue-300">Platform features</p>
          <h2 className="text-2xl font-semibold text-white">Built for safe, guided security education</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            ['Visual labs', 'Each lab follows an introduction, theory, demo, logs, defense, and quiz flow.'],
            ['AI mentor', 'Get concise beginner-friendly explanations for core security concepts.'],
            ['Progress tracking', 'Monitor your labs, achievements, and defensive skill growth.']
          ].map(([title, body]) => (
            <div key={title} className="rounded-2xl border border-slate-800 bg-card p-6">
              <h3 className="text-lg font-semibold text-white">{title}</h3>
              <p className="mt-2 text-sm text-slate-400">{body}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

function DashboardPage() {
  const { user, token } = useAuth();
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    fetch(`${API_BASE}/api/dashboard`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => response.json())
      .then((data) => {
        setSummary(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [token]);

  const profile = summary?.user || user || {};
  const strengths = summary?.strengths || [];
  const weakAreas = summary?.weakAreas || [];
  const challenge = summary?.dailyChallenge || null;

  const exportReport = async () => {
    const response = await fetch(`${API_BASE}/api/reports/export`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'cyberarena-learning-report.txt';
    link.click();
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return <main className="mx-auto max-w-7xl px-6 py-10 text-slate-400 lg:px-8">Loading your personalized dashboard…</main>;
  }

  return (
    <main className="mx-auto max-w-7xl space-y-8 px-6 py-10 lg:px-8">
      <div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-card to-slate-900 p-8 shadow-cyber">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-blue-300">Personalized dashboard</p>
            <h1 className="mt-2 text-3xl font-semibold text-white">Security Score {profile.score || 92}</h1>
            <p className="mt-3 max-w-2xl text-slate-400">Your path is now tailored around your strongest areas, your weakest categories, and the next best challenge to build confidence.</p>
          </div>
          <button onClick={exportReport} className="inline-flex items-center gap-2 rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-200 transition hover:bg-slate-800">
            <Download className="h-4 w-4" /> Export report
          </button>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {[
          ['Completed Labs', `${profile.completedLabs || 0}/11`],
          ['XP', `${profile.xp || 0} XP`],
          ['Level', `Lv ${profile.level || 1}`],
          ['Streak', `${profile.streak || 0} days`]
        ].map(([label, value]) => (
          <div key={label} className="rounded-2xl border border-slate-800 bg-card p-6">
            <p className="text-sm text-slate-400">{label}</p>
            <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
          </div>
        ))}
      </div>
      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-2xl border border-slate-800 bg-card p-6">
          <div className="flex items-center gap-2 text-blue-300">
            <BarChart3 className="h-5 w-5" />
            <h2 className="text-xl font-semibold text-white">Skill analytics</h2>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-700 bg-slate-950/70 p-4">
              <p className="text-sm text-slate-400">Strengths</p>
              <div className="mt-3 space-y-2">
                {strengths.length > 0 ? strengths.map((item) => <div key={item} className="text-sm text-emerald-400">• {item}</div>) : <p className="text-sm text-slate-400">Complete more labs to reveal your best categories.</p>}
              </div>
            </div>
            <div className="rounded-2xl border border-slate-700 bg-slate-950/70 p-4">
              <p className="text-sm text-slate-400">Focus areas</p>
              <div className="mt-3 space-y-2">
                {weakAreas.length > 0 ? weakAreas.map((item) => <div key={item} className="text-sm text-amber-400">• {item}</div>) : <p className="text-sm text-slate-400">You are already strong across the main vulnerability categories.</p>}
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-card p-6">
          <div className="flex items-center gap-2 text-purple-300">
            <BrainCircuit className="h-5 w-5" />
            <h2 className="text-xl font-semibold text-white">Today’s challenge</h2>
          </div>
          {challenge ? (
            <div className="mt-5 space-y-3 rounded-2xl border border-slate-700 bg-slate-950/70 p-4">
              <p className="text-sm font-semibold text-white">{challenge.title}</p>
              <p className="text-sm text-slate-400">{challenge.description}</p>
              <div className="flex items-center justify-between text-sm text-slate-300">
                <span>Reward: {challenge.reward} XP</span>
                <span>{challenge.category}</span>
              </div>
            </div>
          ) : (
            <p className="mt-4 text-sm text-slate-400">No challenge available right now.</p>
          )}
          <div className="mt-5 flex flex-wrap gap-2">
            {(profile.badges || []).slice(0, 4).map((badge) => (
              <span key={badge} className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-sm text-slate-200">
                <BadgeCheck className="h-4 w-4 text-emerald-400" /> {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

function LabsPage() {
  return (
    <main className="mx-auto max-w-7xl space-y-8 px-6 py-10 lg:px-8">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-blue-300">Attack labs</p>
          <h1 className="mt-2 text-3xl font-semibold text-white">Safe simulations across the OWASP Top 10</h1>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {labs.map((lab) => (
          <motion.article key={lab.id} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-2xl border border-slate-800 bg-card p-6 shadow-cyber">
            <div className="flex items-center justify-between">
              <span className="rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-purple-300">{lab.risk}</span>
              <span className="text-sm text-slate-400">{lab.category}</span>
            </div>
            <h2 className="mt-4 text-xl font-semibold text-white">{lab.title}</h2>
            <p className="mt-3 text-sm text-slate-400">{lab.description}</p>
            <div className="mt-6 flex items-center justify-between text-sm text-slate-300">
              <span>Interactive demo</span>
              <Link to={`/labs/${lab.id}`} className="text-blue-300 transition hover:text-blue-200">Open Lab →</Link>
            </div>
          </motion.article>
        ))}
      </div>
    </main>
  );
}

function LabDetailPage() {
  const params = window.location.pathname.split('/');
  const labId = params[params.length - 1];
  const lab = labs.find((entry) => entry.id === labId) || labs[0];

  return (
    <main className="mx-auto max-w-5xl space-y-8 px-6 py-10 lg:px-8">
      <div className="rounded-3xl border border-slate-800 bg-card p-8 shadow-cyber">
        <p className="text-sm uppercase tracking-[0.3em] text-blue-300">Interactive lab</p>
        <h1 className="mt-2 text-3xl font-semibold text-white">{lab.title}</h1>
        <p className="mt-3 text-slate-400">{lab.overview}</p>
      </div>
      <LabPanel lab={lab} />
    </main>
  );
}

function AIPage() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const askAssistant = async () => {
    setLoading(true);
    const response = await fetch(`${API_BASE}/api/ai/assist`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question })
    });
    const payload = await response.json();
    setAnswer(payload.answer || 'No answer yet.');
    setLoading(false);
  };

  return (
    <main className="mx-auto max-w-5xl space-y-8 px-6 py-10 lg:px-8">
      <div className="rounded-3xl border border-slate-800 bg-card p-8 shadow-cyber">
        <p className="text-sm uppercase tracking-[0.3em] text-blue-300">AI assistant</p>
        <h1 className="mt-2 text-3xl font-semibold text-white">Ask beginner-friendly questions about security concepts</h1>
      </div>
      <div className="rounded-2xl border border-slate-800 bg-card p-6">
        <textarea className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-100" rows="4" placeholder="Ask about SQL injection, XSS, CSRF, JWT, hashing, or encryption" value={question} onChange={(event) => setQuestion(event.target.value)} />
        <button className="mt-4 rounded-full bg-blue-600 px-4 py-2 text-sm text-white transition hover:bg-blue-500" onClick={askAssistant} disabled={loading}>{loading ? 'Thinking…' : 'Ask assistant'}</button>
        {answer && <div className="mt-6 rounded-xl border border-slate-700 bg-slate-900/70 p-4 text-sm text-slate-300">{answer}</div>}
      </div>
    </main>
  );
}

function LeaderboardPage() {
  return (
    <main className="mx-auto max-w-6xl space-y-8 px-6 py-10 lg:px-8">
      <div className="rounded-3xl border border-slate-800 bg-card p-8 shadow-cyber">
        <p className="text-sm uppercase tracking-[0.3em] text-blue-300">Leaderboard</p>
        <h1 className="mt-2 text-3xl font-semibold text-white">Top learners in CyberArena</h1>
      </div>
      <div className="rounded-2xl border border-slate-800 bg-card p-6">
        {['Ava', 'Mason', 'Noah'].map((name, index) => (
          <div key={name} className="flex items-center justify-between rounded-xl border border-slate-700 bg-slate-900/70 px-4 py-3 text-sm text-slate-300">
            <span>#{index + 1} {name}</span>
            <span>Score: {95 - index * 4}</span>
          </div>
        ))}
      </div>
    </main>
  );
}

function RoadmapPage() {
  const roadmap = [
    ['A01: Broken Access Control', 'Understand authorization gaps and least-privilege design.', 'In progress'],
    ['A03: Injection', 'Practice how input validation and parameterization stop attacks.', 'Next'],
    ['A05: Security Misconfiguration', 'Learn secure defaults, headers, and safe deployments.', 'Planned'],
    ['A07: Authentication Failures', 'Build confidence around MFA, session hygiene, and password policy.', 'Planned']
  ];

  return (
    <main className="mx-auto max-w-6xl space-y-8 px-6 py-10 lg:px-8">
      <div className="rounded-3xl border border-slate-800 bg-card p-8 shadow-cyber">
        <p className="text-sm uppercase tracking-[0.3em] text-blue-300">OWASP roadmap</p>
        <h1 className="mt-2 text-3xl font-semibold text-white">Interactive roadmap for the OWASP Top 10</h1>
        <p className="mt-3 text-slate-400">Follow a structured progression from foundational concepts to practical defense patterns.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {roadmap.map(([title, description, status]) => (
          <div key={title} className="rounded-2xl border border-slate-800 bg-card p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">{title}</h2>
              <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-blue-300">{status}</span>
            </div>
            <p className="mt-3 text-sm text-slate-400">{description}</p>
          </div>
        ))}
      </div>
    </main>
  );
}

function ChallengesPage() {
  const { token } = useAuth();
  const [challenge, setChallenge] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!token) return;
    fetch(`${API_BASE}/api/challenges/daily`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => response.json())
      .then((data) => setChallenge(data))
      .catch(() => setChallenge(null));
  }, [token]);

  const completeChallenge = async () => {
    const response = await fetch(`${API_BASE}/api/challenges/complete`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ id: challenge?.id })
    });
    const payload = await response.json();
    setMessage(payload.message || 'Challenge updated.');
  };

  return (
    <main className="mx-auto max-w-6xl space-y-8 px-6 py-10 lg:px-8">
      <div className="rounded-3xl border border-slate-800 bg-card p-8 shadow-cyber">
        <p className="text-sm uppercase tracking-[0.3em] text-blue-300">Daily challenges</p>
        <h1 className="mt-2 text-3xl font-semibold text-white">Practice a fresh security habit every day</h1>
      </div>
      {challenge ? (
        <div className="rounded-2xl border border-slate-800 bg-card p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold text-white">{challenge.title}</h2>
              <p className="mt-2 text-sm text-slate-400">{challenge.description}</p>
            </div>
            <button onClick={completeChallenge} className="rounded-full bg-blue-600 px-4 py-2 text-sm text-white transition hover:bg-blue-500">Complete challenge</button>
          </div>
          <div className="mt-4 flex flex-wrap gap-2 text-sm text-slate-300">
            <span className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1">Reward: {challenge.reward} XP</span>
            <span className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1">Category: {challenge.category}</span>
          </div>
          {message && <p className="mt-4 text-sm text-emerald-400">{message}</p>}
        </div>
      ) : <p className="text-sm text-slate-400">Sign in to receive today’s challenge.</p>}
    </main>
  );
}

function CommunityPage() {
  const posts = [
    { author: 'Mina', topic: 'SQL Injection', body: 'The parameterized query walkthrough made the mitigation very clear.' },
    { author: 'Devon', topic: 'XSS', body: 'I would love more examples around CSP and output encoding.' },
    { author: 'Nora', topic: 'Authentication', body: 'Session rotation feels much easier to understand now.' }
  ];

  return (
    <main className="mx-auto max-w-6xl space-y-8 px-6 py-10 lg:px-8">
      <div className="rounded-3xl border border-slate-800 bg-card p-8 shadow-cyber">
        <p className="text-sm uppercase tracking-[0.3em] text-blue-300">Community</p>
        <h1 className="mt-2 text-3xl font-semibold text-white">Discuss labs and share takeaways</h1>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <div key={post.author + post.topic} className="rounded-2xl border border-slate-800 bg-card p-6">
            <p className="text-sm text-blue-300">{post.topic}</p>
            <h2 className="mt-2 text-xl font-semibold text-white">{post.author}</h2>
            <p className="mt-3 text-sm text-slate-400">{post.body}</p>
          </div>
        ))}
      </div>
    </main>
  );
}

function AboutPage() {
  return (
    <main className="mx-auto max-w-5xl space-y-8 px-6 py-10 lg:px-8">
      <div className="rounded-3xl border border-slate-800 bg-card p-8 shadow-cyber">
        <p className="text-sm uppercase tracking-[0.3em] text-blue-300">About CyberArena</p>
        <h1 className="mt-2 text-3xl font-semibold text-white">A safe, guided learning platform for web security</h1>
        <p className="mt-3 text-slate-400">CyberArena teaches common web attack patterns through isolated, educational simulations. Every lab explains the attack, shows the impact, and then reinforces the defense with secure coding guidance.</p>
      </div>
    </main>
  );
}

function AchievementsPage() {
  return (
    <main className="mx-auto max-w-6xl space-y-8 px-6 py-10 lg:px-8">
      <div className="rounded-3xl border border-slate-800 bg-card p-8 shadow-cyber">
        <p className="text-sm uppercase tracking-[0.3em] text-blue-300">Achievements</p>
        <h1 className="mt-2 text-3xl font-semibold text-white">Unlock your defensive milestones</h1>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {[
          ['SQL Master', 'Complete the SQL injection lab'],
          ['XSS Hunter', 'Finish the XSS simulation'],
          ['Cyber Defender', 'Master core defensive practices'],
          ['OWASP Explorer', 'Explore the full lab catalog']
        ].map(([title, description]) => (
          <div key={title} className="rounded-2xl border border-slate-800 bg-card p-6">
            <h2 className="text-xl font-semibold text-white">{title}</h2>
            <p className="mt-2 text-sm text-slate-400">{description}</p>
          </div>
        ))}
      </div>
    </main>
  );
}

function CertificatesPage() {
  return (
    <main className="mx-auto max-w-5xl space-y-8 px-6 py-10 lg:px-8">
      <div className="rounded-3xl border border-slate-800 bg-card p-8 shadow-cyber">
        <p className="text-sm uppercase tracking-[0.3em] text-blue-300">Certificates</p>
        <h1 className="mt-2 text-3xl font-semibold text-white">Download your completion certificate</h1>
        <p className="mt-3 text-slate-400">Complete the full curriculum to unlock a professional certificate representing your defensive security journey.</p>
      </div>
    </main>
  );
}

function ProfilePage() {
  const { user } = useAuth();
  return (
    <main className="mx-auto max-w-5xl space-y-8 px-6 py-10 lg:px-8">
      <div className="rounded-3xl border border-slate-800 bg-card p-8 shadow-cyber">
        <p className="text-sm uppercase tracking-[0.3em] text-blue-300">Profile</p>
        <h1 className="mt-2 text-3xl font-semibold text-white">{user?.name || 'Student profile'}</h1>
        <p className="mt-3 text-slate-400">{user?.email || 'Sign in to track your progress.'}</p>
      </div>
    </main>
  );
}

function SettingsPage() {
  return (
    <main className="mx-auto max-w-5xl space-y-8 px-6 py-10 lg:px-8">
      <div className="rounded-3xl border border-slate-800 bg-card p-8 shadow-cyber">
        <p className="text-sm uppercase tracking-[0.3em] text-blue-300">Settings</p>
        <h1 className="mt-2 text-3xl font-semibold text-white">Manage your learning preferences</h1>
      </div>
    </main>
  );
}

function App() {
  return (
    <AuthProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/roadmap" element={<ProtectedRoute><RoadmapPage /></ProtectedRoute>} />
          <Route path="/labs" element={<ProtectedRoute><LabsPage /></ProtectedRoute>} />
          <Route path="/challenges" element={<ProtectedRoute><ChallengesPage /></ProtectedRoute>} />
          <Route path="/labs/:labId" element={<ProtectedRoute><LabDetailPage /></ProtectedRoute>} />
          <Route path="/ai" element={<ProtectedRoute><AIPage /></ProtectedRoute>} />
          <Route path="/leaderboard" element={<ProtectedRoute><LeaderboardPage /></ProtectedRoute>} />
          <Route path="/achievements" element={<ProtectedRoute><AchievementsPage /></ProtectedRoute>} />
          <Route path="/community" element={<ProtectedRoute><CommunityPage /></ProtectedRoute>} />
          <Route path="/certificates" element={<ProtectedRoute><CertificatesPage /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute><AdminPanel /></ProtectedRoute>} />
          <Route path="/auth" element={<AuthForm />} />
        </Routes>
      </Layout>
    </AuthProvider>
  );
}

export default App;
