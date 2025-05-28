import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function App() {
  const [view, setView] = useState("welcome");
  const [mScore, setMScore] = useState(null);

  const calculateMScore = () => {
    const score = Math.floor(Math.random() * 100) + 1;
    setMScore(score);
  };

  if (view === "welcome") {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h1>Nomia</h1>
        <p>Your metabolic health companion</p>
        <button onClick={() => setView("dashboard")}>Get Started</button>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h2>Your M Score</h2>
      <div style={{ height: 20, width: '100%', background: '#eee', borderRadius: 10, overflow: 'hidden' }}>
        <div style={{
          width: mScore + '%',
          height: '100%',
          background: '#5B7F95'
        }}></div>
      </div>
      <p>{mScore ? `${mScore}%` : '--'}</p>
      <button onClick={calculateMScore} style={{ marginTop: '1rem' }}>Calculate</button>
    </div>
  );
}