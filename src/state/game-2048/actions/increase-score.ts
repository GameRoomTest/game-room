import { GetStore, SetStore } from '..';

export const increaseScore = (score: number, set: SetStore, get: GetStore) => {
  const newScore = get().score + score;
  const currentBest = get().best;

  if (newScore > currentBest) {
    set(() => ({ best: newScore }));
  }

  set(() => ({ score: newScore }));
};
