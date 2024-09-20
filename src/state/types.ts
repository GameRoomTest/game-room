export type TSetStore<T> = (setStateCallback: (state: T) => Partial<T>) => void;

export type TGetStore<T> = () => T;
