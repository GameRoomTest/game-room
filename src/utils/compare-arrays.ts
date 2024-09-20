import { intersection } from 'lodash';

export function areDiferentArrays(first: string[], second: string[]): boolean {
  const theyHaveSameLength = first.length !== second.length;

  if (theyHaveSameLength) return true;

  const interceptedItems = intersection(first, second);

  return interceptedItems.length !== first.length;
}
