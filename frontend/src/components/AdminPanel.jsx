export default function AdminPanel() {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-800 bg-card p-8 shadow-cyber">
        <p className="text-sm uppercase tracking-[0.3em] text-blue-300">Admin dashboard</p>
        <h2 className="mt-2 text-2xl font-semibold text-white">Manage learners, labs, and announcements</h2>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        {['Users', 'Lab Status', 'Announcements'].map((item) => (
          <div key={item} className="rounded-2xl border border-slate-800 bg-card p-6">
            <p className="text-sm text-slate-400">{item}</p>
            <p className="mt-2 text-2xl font-semibold text-white">Live</p>
          </div>
        ))}
      </div>
    </div>
  );
}
