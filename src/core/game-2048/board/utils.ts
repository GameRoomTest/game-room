import { v4 as uuid } from 'uuid';

import { getRandomValue } from 'src/utils/get-random-number';
import {
  Axis,
  Direction,
  Board,
  TempBoardMatrix,
  TempTile,
  TempInMotionTile,
  Position,
} from './types';
import {
  TILE_POSITION_SEPARATOR,
  columnLength,
  initialTileValue,
  rowLength,
  tilesPositions,
} from './fixtures';

export function insertOne(board: Board): Board {
  const _board = structuredClone(board);

  const filledPositions = board.map((tile) => getValuePosition(tile.position));
  const newTileValuePosition = getRandomValue(tilesPositions, filledPositions);

  _board.push({
    id: uuid(),
    value: initialTileValue,
    position: getPositionFromValue(newTileValuePosition),
  });

  return _board;
}

export const getInitialBoard = (): Board => {
  const initialBoard: Board = [];

  const firstTileValuePosition = getRandomValue(tilesPositions);
  const secondTileValuePosition = getRandomValue(tilesPositions, [
    firstTileValuePosition,
  ]);

  initialBoard.push({
    id: uuid(),
    value: initialTileValue,
    position: getPositionFromValue(firstTileValuePosition),
  });
  initialBoard.push({
    id: uuid(),
    value: initialTileValue,
    position: getPositionFromValue(secondTileValuePosition),
  });

  return initialBoard;
};

export function getNextBoard(
  board: Board,
  axis: Axis,
  direction: Direction,
): Board {
  const tempBoardMatrix = getEmptyBoardMatrix();

  board.forEach((tile) => {
    tempBoardMatrix[tile.position[Axis.Y]][tile.position[Axis.X]] = {
      id: tile.id,
      value: tile.value,
    };
  });

  const nextBoardMatrix = getNextBoardMatrix(tempBoardMatrix, axis, direction);

  const nextBoard: Board = [];

  nextBoardMatrix.forEach((row, columnIndex) => {
    row.forEach((tile, rowIndex) => {
      if (tile) {
        nextBoard.push({
          ...tile,
          position: {
            [Axis.X]: rowIndex,
            [Axis.Y]: columnIndex,
          },
        });
      }
    });
  });

  return nextBoard;
}

export function getEmptyBoardMatrix(): TempBoardMatrix {
  return Array(columnLength)
    .fill(undefined)
    .map(() => Array(rowLength).fill(undefined));
}

export function getNextBoardMatrix(
  board: TempBoardMatrix,
  axis: Axis,
  direction: Direction,
): TempBoardMatrix {
  const _board = structuredClone(board);

  if (axis === Axis.X) {
    const columnLength = board.length;

    for (let i = 0; i < columnLength; i++) {
      _board[i] = getNextTiles(board[i], axis, direction);
    }
  } else {
    const rowLength = board[0].length;

    for (let i = 0; i < rowLength; i++) {
      const tiles = getColumn(board, i);

      const nextColumn = getNextTiles(tiles, axis, direction);

      nextColumn.forEach((tile, columnIndex) => {
        _board[columnIndex][i] = tile;
      });
    }
  }

  return _board;
}

function getColumn(board: TempBoardMatrix, columnIndex: number): TempTile[] {
  const tiles: TempTile[] = [];

  board.forEach((row) => {
    tiles.push(row[columnIndex]);
  });

  return tiles;
}

function getNextTiles(tiles: TempTile[], axis: Axis, direction: Direction) {
  // move the items towards the direction
  const relocatedTiles = relocate(tiles, axis, direction);

  // merge those that are the same and are consecutive
  const tilesJoinedByPairs = joinPairs(relocatedTiles, direction);

  // move the items towards the direction
  const result = relocate(tilesJoinedByPairs, axis, direction);

  return result;
}

function joinPairs(tiles: TempTile[], direction: Direction): TempTile[] {
  const _tiles =
    direction === Direction.POSITIVE ? [...tiles].reverse() : [...tiles];

  for (let i = 0; i < _tiles.length; i++) {
    const tile = _tiles[i];
    const nextIndex = i + 1;

    // if doesn't exist the next index
    if (nextIndex >= _tiles.length) continue;

    const nextTile = _tiles[nextIndex];

    // if the current or the next tile don't exist
    if (!tile || !nextTile) continue;

    // if they are diferent
    if (tile.value !== nextTile.value) continue;

    // set the total value in the current tile
    _tiles[i] = {
      ...tile,
      id: nextTile.id,
      value: tile.value + nextTile.value,
    };
    // discard the next tile
    _tiles[nextIndex] = undefined;
  }

  return direction === Direction.POSITIVE ? _tiles.reverse() : _tiles;
}

function relocate(
  tiles: TempTile[],
  axis: Axis,
  direction: Direction,
): TempTile[] {
  const tilesWithValues: TempInMotionTile[] = [];
  const blanks: undefined[] = [];

  for (let i = 0; i < tiles.length; i++) {
    const tile = tiles[i];

    if (tile) {
      tilesWithValues.push(tile);
    } else {
      blanks.push(undefined);
    }
  }

  const nextTiles =
    direction === Direction.POSITIVE
      ? [...blanks, ...tilesWithValues]
      : [...tilesWithValues, ...blanks];
  return nextTiles;
}

export function getPositionFromValue(valuePosition: string): Position {
  const [x, y] = valuePosition.split(TILE_POSITION_SEPARATOR);

  return {
    [Axis.X]: +x,
    [Axis.Y]: +y,
  };
}

export function getValuePosition(position: Position): string {
  return `${position[Axis.X]}${TILE_POSITION_SEPARATOR}${position[Axis.Y]}`;
}

export function getValuePositions(): string[] {
  const positions: string[] = [];

  for (let x = 0; x < rowLength; x++) {
    for (let y = 0; y < columnLength; y++) {
      positions.push(getValuePosition({ x, y }));
    }
  }

  return positions;
}
