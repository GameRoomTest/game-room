import { TGetStore, TSetStore } from 'src/state/types';

export interface Game2048State {
  score: number;
  best: number;
  increaseScore: (score: number) => void;
  setBestScore: (bestScore: number) => void;
  resetScore: () => void;
}

export type SetStore = TSetStore<Game2048State>;
export type GetStore = TGetStore<Game2048State>;

export const BEST_SCORE_LOCALSTORAGE_KEY = 'bestScore';
