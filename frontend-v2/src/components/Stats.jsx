import React, { useState, useEffect } from 'react';
import { Activity, Users, CheckCircle2 } from 'lucide-react';

export function Stats() {
  const [stats, setStats] = useState({
    activeUsers: 12000,
    queriesProcessed: 24000,
    accuracy: 89
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 5),
        queriesProcessed: prev.queriesProcessed + Math.floor(Math.random() * 10),
        accuracy: Math.min(95, prev.accuracy + (Math.random() - 0.5))
      }));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-gradient-to-r from-brand-blue to-indigo-700 py-10 relative overflow-hidden text-white mt-10">
      <div className="absolute inset-0 opacity-10 background-pattern"></div>
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10 divide-y md:divide-y-0 md:divide-x divide-white/20">
        
        <div className="flex flex-col items-center justify-center p-4">
          <Users className="w-8 h-8 mb-3 text-brand-teal" />
          <div className="text-3xl font-bold tracking-tight mb-1">{stats.activeUsers.toLocaleString()}</div>
          <div className="text-blue-100 font-medium">Active Users</div>
        </div>
        
        <div className="flex flex-col items-center justify-center p-4">
          <Activity className="w-8 h-8 mb-3 text-brand-teal" />
          <div className="text-3xl font-bold tracking-tight mb-1">{stats.queriesProcessed.toLocaleString()}</div>
          <div className="text-blue-100 font-medium">Queries Today</div>
        </div>

        <div className="flex flex-col items-center justify-center p-4">
          <CheckCircle2 className="w-8 h-8 mb-3 text-brand-teal" />
          <div className="text-3xl font-bold tracking-tight mb-1">{stats.accuracy.toFixed(1)}%</div>
          <div className="text-blue-100 font-medium">AI Accuracy</div>
        </div>

      </div>
    </div>
  );
}
