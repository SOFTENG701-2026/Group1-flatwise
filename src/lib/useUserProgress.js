import { useState, useEffect, useCallback } from 'react';
import { base44 } from '@/api/base44Client';
import { getLevelFromXP } from './flatwiseData';

export function useUserProgress() {
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const fetchProgress = useCallback(async () => {
    const me = await base44.auth.me();
    setUser(me);
    const records = await base44.entities.UserProgress.filter({ user_email: me.email });
    if (records.length > 0) {
      setProgress(records[0]);
    } else {
      const np = await base44.entities.UserProgress.create({
        user_email: me.email,
        xp: 0,
        level: 1,
        streak_days: 0,
        last_activity_date: new Date().toISOString().split('T')[0],
        completed_modules: [],
        completed_challenges: [],
        completed_quizzes: [],
        badges: [],
        simulator_high_score: 0,
        watched_biases: [],
        flat_code: '',
        session_streak: 0,
      });
      setProgress(np);
    }
    setLoading(false);
  }, []);

  useEffect(() => { fetchProgress(); }, [fetchProgress]);

  const addXP = useCallback(async (amount) => {
    if (!progress) return;
    const newXP = (progress.xp || 0) + amount;
    const newLevel = getLevelFromXP(newXP);
    const today = new Date().toISOString().split('T')[0];
    let newStreak = progress.streak_days || 0;
    if (progress.last_activity_date !== today) {
      const yesterday = new Date(); yesterday.setDate(yesterday.getDate() - 1);
      newStreak = progress.last_activity_date === yesterday.toISOString().split('T')[0] ? newStreak + 1 : 1;
    }
    const updated = await base44.entities.UserProgress.update(progress.id, {
      xp: newXP, level: newLevel, streak_days: newStreak, last_activity_date: today
    });
    setProgress(updated);
    return updated;
  }, [progress]);

  const completeModule = useCallback(async (moduleId, xpReward) => {
    if (!progress) return;
    const completed = progress.completed_modules || [];
    if (completed.includes(moduleId)) return;
    const sessionStreak = (progress.session_streak || 0) + 1;
    const updated = await base44.entities.UserProgress.update(progress.id, {
      completed_modules: [...completed, moduleId],
      session_streak: sessionStreak,
    });
    setProgress(updated);
    await addXP(xpReward);
  }, [progress, addXP]);

  const completeChallenge = useCallback(async (challengeId, xpReward) => {
    if (!progress) return;
    const completed = progress.completed_challenges || [];
    if (completed.includes(challengeId)) return;
    const updated = await base44.entities.UserProgress.update(progress.id, {
      completed_challenges: [...completed, challengeId]
    });
    setProgress(updated);
    await addXP(xpReward);
  }, [progress, addXP]);

  const addBias = useCallback(async (biasId) => {
    if (!progress) return;
    const existing = progress.watched_biases || [];
    if (existing.includes(biasId)) return;
    const updated = await base44.entities.UserProgress.update(progress.id, {
      watched_biases: [...existing, biasId]
    });
    setProgress(updated);
  }, [progress]);

  const updateFlatCode = useCallback(async (code) => {
    if (!progress) return;
    const updated = await base44.entities.UserProgress.update(progress.id, { flat_code: code });
    setProgress(updated);
  }, [progress]);

  return { progress, loading, user, addXP, completeModule, completeChallenge, addBias, updateFlatCode, refetch: fetchProgress };
}