import { getValuePositions } from './utils';

export const colors = [
  '#f0e9de',
  '#efe3cf',
  '#f4b27a',
  '#f99663',
  '#f87e5e',
  '#f75f40',
  '#f0d273',
  '#f0ce60',
  '#f1cd52',
  '#e7c257',
  '#e8be4e',
];

export const columnLength = 4;
export const rowLength = 4;
export const initialTileValue = 2;
export const TILE_POSITION_SEPARATOR = '-' as const;

export const tilesPositions: string[] = getValuePositions();
