import { create } from 'zustand';

import { increaseScore } from './actions/increase-score';
import { setBestScore } from './actions/set-best-score';
import { BEST_SCORE_LOCALSTORAGE_KEY, Game2048State } from './types';

const initialBestScore = +(
  localStorage.getItem(BEST_SCORE_LOCALSTORAGE_KEY) || 0
);

export const useGame2048Store = create<Game2048State>()((set, get) => ({
  score: 0,
  best: initialBestScore,
  increaseScore: (score: number) => increaseScore(score, set, get),
  setBestScore: (bestScore: number) => setBestScore(bestScore, set),
  resetScore: () => set({ score: 0 }),
}));
