import { useMemo, useState } from 'react';

export default function LabPanel({ lab }) {
  const [completed, setCompleted] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [feedback, setFeedback] = useState('');

  const steps = useMemo(() => lab?.steps || ['Introduction', 'Theory', 'Detection', 'Defense'], [lab]);

  const submitQuiz = () => {
    if (selectedAnswer === 'parameterized') {
      setFeedback('Correct. Parameterized queries keep user input from changing query logic.');
      setCompleted(true);
    } else {
      setFeedback('Try again. The secure approach uses parameterized queries and input validation.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-800 bg-card p-6 shadow-cyber">
        <h2 className="text-2xl font-semibold text-white">{lab?.title}</h2>
        <p className="mt-3 text-sm text-slate-400">{lab?.overview}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {steps.map((step) => (
            <span key={step} className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-xs text-slate-300">{step}</span>
          ))}
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-800 bg-card p-6">
          <h3 className="text-lg font-semibold text-white">Interactive demo</h3>
          <p className="mt-3 text-sm text-slate-400">This simulated lab stays inside the application and shows how the issue appears and how it is mitigated.</p>
          <div className="mt-4 rounded-xl border border-slate-700 bg-slate-950/80 p-4 font-mono text-sm text-slate-300">
            <p>[INFO] Sandbox initialized</p>
            <p>[WARN] Untrusted input detected</p>
            <p>[INFO] Defenses applied</p>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-card p-6">
          <h3 className="text-lg font-semibold text-white">Quick quiz</h3>
          <select className="mt-4 w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-100" value={selectedAnswer} onChange={(event) => setSelectedAnswer(event.target.value)}>
            <option value="">Select a defense</option>
            <option value="parameterized">Parameterized queries</option>
            <option value="concat">String concatenation</option>
          </select>
          <button className="mt-4 rounded-full bg-blue-600 px-4 py-2 text-sm text-white transition hover:bg-blue-500" onClick={submitQuiz}>Submit answer</button>
          {feedback && <p className={`mt-4 text-sm ${completed ? 'text-green-400' : 'text-slate-300'}`}>{feedback}</p>}
        </div>
      </div>
    </div>
  );
}
