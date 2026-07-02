import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="mx-auto max-w-5xl px-6 py-20 text-sm text-slate-400">Loading your learning workspace…</div>;
  }

  return user ? children : <Navigate to="/auth" replace />;
}
