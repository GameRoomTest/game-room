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

let id = 1;

export function insertOne(board: Board): Board {
  const _board = structuredClone(board);

  const filledPositions = board.map((tile) => getValuePosition(tile.position));
  const newTileValuePosition = getRandomValue(tilesPositions, filledPositions);

  _board.push({
    id: getId(),
    value: initialTileValue,
    position: getPositionFromValue(newTileValuePosition),
  });

  return sortAsc(_board);
}

export const getInitialBoard = (): Board => {
  const initialBoard: Board = [];

  const firstTileValuePosition = getRandomValue(tilesPositions);
  const secondTileValuePosition = getRandomValue(tilesPositions, [
    firstTileValuePosition,
  ]);

  initialBoard.push({
    id: getId(),
    value: initialTileValue,
    position: getPositionFromValue(firstTileValuePosition),
  });
  initialBoard.push({
    id: getId(),
    value: initialTileValue,
    position: getPositionFromValue(secondTileValuePosition),
  });

  return initialBoard;
};

export function getNextBoard(board: Board, axis: Axis, direction: Direction) {
  const tempBoardMatrix = getEmptyBoardMatrix();

  board.forEach((tile) => {
    tempBoardMatrix[tile.position[Axis.Y]][tile.position[Axis.X]] = {
      id: tile.id,
      value: tile.value,
    };
  });

  const { nextBoardMatrix, newValues } = getNextBoardMatrix(
    tempBoardMatrix,
    axis,
    direction,
  );

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

  return { nextBoard: sortAsc(nextBoard), newValues };
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
) {
  const _board = structuredClone(board);

  const _newValues: number[] = [];

  if (axis === Axis.X) {
    const columnLength = board.length;

    for (let i = 0; i < columnLength; i++) {
      const { nextTiles, newValues } = getNextTiles(board[i], axis, direction);
      _board[i] = nextTiles;

      _newValues.push(...newValues);
    }
  } else {
    const rowLength = board[0].length;

    for (let i = 0; i < rowLength; i++) {
      const tiles = getColumn(board, i);

      const { nextTiles: nextColumn, newValues } = getNextTiles(
        tiles,
        axis,
        direction,
      );

      nextColumn.forEach((tile, columnIndex) => {
        _board[columnIndex][i] = tile;
      });

      _newValues.push(...newValues);
    }
  }

  return { nextBoardMatrix: _board, newValues: _newValues };
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
  const { joinedTiles, newValues } = joinPairs(relocatedTiles, direction);

  // move the items towards the direction
  const nextTiles = relocate(joinedTiles, axis, direction);

  return { nextTiles, newValues };
}

function joinPairs(tiles: TempTile[], direction: Direction) {
  const _tiles =
    direction === Direction.POSITIVE ? [...tiles].reverse() : [...tiles];

  const newValues: number[] = [];

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
    const newValue = tile.value + nextTile.value;

    _tiles[i] = {
      ...tile,
      id: nextTile.id,
      value: newValue,
    };

    // discard the next tile
    _tiles[nextIndex] = undefined;

    newValues.push(newValue);
  }

  const joinedTiles =
    direction === Direction.POSITIVE ? _tiles.reverse() : _tiles;

  return { joinedTiles, newValues };
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

function sortAsc(array: Board) {
  return array.sort((a, b) => a.id - b.id);
}

function getId(): number {
  return id++;
}
