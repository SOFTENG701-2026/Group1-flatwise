import { useState, useEffect } from 'react';

const STORAGE_KEY = 'flatwise_progress';

const defaultProgress = {
  completedModules: [],
  xp: 0,
  streak: 0,
  lastActive: null,
};

export function useProgress() {
  const [progress, setProgress] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : defaultProgress;
    } catch {
      return defaultProgress;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const completeModule = (moduleId, xpEarned) => {
    setProgress(prev => {
      if (prev.completedModules.includes(moduleId)) return prev;
      const today = new Date().toDateString();
      const isConsecutive = prev.lastActive === new Date(Date.now() - 86400000).toDateString();
      return {
        ...prev,
        completedModules: [...prev.completedModules, moduleId],
        xp: prev.xp + xpEarned,
        streak: isConsecutive ? prev.streak + 1 : prev.lastActive === today ? prev.streak : 1,
        lastActive: today,
      };
    });
  };

  const resetProgress = () => setProgress(defaultProgress);

  return { progress, completeModule, resetProgress };
}
