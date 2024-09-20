import { FunctionComponent, useCallback, useRef, useState } from 'react';
import { Axis, Direction, Board as IBoard } from './types';
import {
  getInitialBoard,
  getNextBoard,
  getValuePosition,
  insertOne,
} from './utils';
import { useKeyDownHandler } from './use-key-down-handler';
import { useSetTileSize } from './use-set-tile-size';
import { columnLength, rowLength } from './fixtures';
import { areDiferentArrays } from 'src/utils/compare-arrays';
import Tile from './tile';
import { useGame2048Store } from 'src/state/game-2048';
import { useSwipingGestureHandler } from './use-swiping-gesture-handler';

const Board: FunctionComponent<StyledComponentProps> = ({ className }) => {
  const boardRef = useRef<HTMLDivElement>(null);

  const motionEnabled = useRef(true);
  const [board, setBoard] = useState<IBoard>(() => getInitialBoard());

  const increaseScore = useGame2048Store((state) => state.increaseScore);

  const move = useCallback(
    async (axis: Axis, direction: Direction) => {
      if (!motionEnabled.current) return;

      motionEnabled.current = false;

      const { nextBoard, newValues } = getNextBoard(board, axis, direction);

      const score = newValues.reduce((a, b) => a + b, 0);

      if (score) {
        increaseScore(score);
      }

      const currentPositions = board.map((x) => getValuePosition(x.position));
      const nextPositions = nextBoard.map((x) => getValuePosition(x.position));

      const boardHasChanged = areDiferentArrays(
        currentPositions,
        nextPositions,
      );

      if (boardHasChanged) {
        const _nextBoard = insertOne(nextBoard);
        setBoard(_nextBoard);
      }

      motionEnabled.current = true;
    },
    [board, increaseScore],
  );

  useKeyDownHandler(move);
  useSwipingGestureHandler(move, boardRef);

  const tileRef = useSetTileSize();

  return (
    <div className={className} ref={boardRef}>
      <div className="tiles-back">
        {Array(rowLength * columnLength)
          .fill(undefined)
          .map((_, i) => (
            <div className="tile-back" ref={tileRef} key={i} />
          ))}
      </div>

      <div className="tiles-container" id="tiles-container">
        {board.map(({ id, value, position }) => (
          <Tile
            key={id}
            value={value}
            x={position[Axis.X]}
            y={position[Axis.Y]}
          />
        ))}
      </div>
    </div>
  );
};

export default Board;
