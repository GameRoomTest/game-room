import {
  BEST_SCORE_LOCALSTORAGE_KEY,
  SetStore,
} from 'src/state/game-2048/types';

export const setBestScore = (bestScore: number, set: SetStore) => {
  set(() => ({ best: bestScore }));

  localStorage.setItem(BEST_SCORE_LOCALSTORAGE_KEY, bestScore.toString());
};
