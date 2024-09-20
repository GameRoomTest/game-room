import { create } from 'zustand';
import { GetStore as TGetStore, SetStore as TSetStore } from '../types';
import { increaseScore } from './actions/increase-score';

interface Game2048State {
  score: number;
  best: number;
  increaseScore: (score: number) => void;
  setBest: (score: number) => void;
}

export const useGame2048Store = create<Game2048State>()((set, get) => ({
  score: 0,
  best: 0,
  increaseScore: (score: number) => increaseScore(score, set, get),
  setBest: (score: number) => set(() => ({ best: score })),
}));

export type SetStore = TSetStore<Game2048State>;
export type GetStore = TGetStore<Game2048State>;
