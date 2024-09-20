export type BoardMatrix = Tile[][];
export type TempBoardMatrix = TempTile[][];

export type Tile = InMotionTile | undefined;
export type TempTile = TempInMotionTile | undefined;

export enum Direction {
  POSITIVE,
  NEGATIVE,
}

export enum Axis {
  X = 'x',
  Y = 'y',
}

export type Position = Record<Axis, number>;

export interface InMotionTile {
  id: number;
  position: Position;
  value: number;
}

export type TempInMotionTile = Pick<InMotionTile, 'id' | 'value'>;

export type Board = InMotionTile[];
