import { GetStore, SetStore } from 'src/state/game-2048/types';

export const increaseScore = (score: number, set: SetStore, get: GetStore) => {
  const newScore = get().score + score;
  const currentBest = get().best;

  if (newScore > currentBest) {
    get().setBestScore(newScore);
  }

  set(() => ({ score: newScore }));
};
