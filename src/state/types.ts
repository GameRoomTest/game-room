export type SetStore<T> = (setStateCallback: (state: T) => Partial<T>) => void;

export type GetStore<T> = () => T;
