import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function AuthForm() {
  const { login, register } = useAuth();
  const [mode, setMode] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setMessage('');
    try {
      if (mode === 'login') {
        await login(email, password);
        setMessage('Login successful.');
      } else {
        await register(name, email, password);
        setMessage('Account created successfully.');
      }
    } catch (err) {
      setError(err.message || 'Authentication error');
    }
  };

  return (
    <div className="rounded-3xl border border-slate-800 bg-card p-8 shadow-cyber">
      <div className="mb-6 flex gap-2">
        <button className={`rounded-full px-4 py-2 text-sm ${mode === 'login' ? 'bg-blue-500 text-white' : 'bg-slate-800 text-slate-300'}`} onClick={() => setMode('login')}>Login</button>
        <button className={`rounded-full px-4 py-2 text-sm ${mode === 'register' ? 'bg-blue-500 text-white' : 'bg-slate-800 text-slate-300'}`} onClick={() => setMode('register')}>Register</button>
      </div>
      <form className="space-y-4" onSubmit={handleSubmit}>
        {mode === 'register' && (
          <input className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-100" placeholder="Full name" value={name} onChange={(event) => setName(event.target.value)} />
        )}
        <input className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-100" placeholder="Email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
        <input className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-100" placeholder="Password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        <button className="w-full rounded-full bg-blue-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-blue-500" type="submit">{mode === 'login' ? 'Sign in' : 'Create account'}</button>
      </form>
      {message && <p className="mt-4 text-sm text-green-400">{message}</p>}
      {error && <p className="mt-4 text-sm text-red-400">{error}</p>}
    </div>
  );
}
