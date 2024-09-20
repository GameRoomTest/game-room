import { FunctionComponent, useState } from 'react';
import { BoardMatrix } from './types';

const Board: FunctionComponent<StyledComponentProps> = ({ className }) => {
  const [boardMatrix, setBoardMatrix] = useState<BoardMatrix>(() =>
    getInitialBoardMatrix(),
  );

  return (
    <div className={className}>
      {boardMatrix.map((row) =>
        row.map((x) => (
          <div className={`tile tile-exp-${getExponent(x)}`}>{x}</div>
        )),
      )}
    </div>
  );
};

export default Board;

function getExponent(total?: number) {
  if (!total) return undefined;

  return Math.log(total) / Math.log(2) - 1;
}

function getInitialBoardMatrix(): BoardMatrix {
  const initialBoardMatrix: BoardMatrix = [
    [undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined],
  ];

  const firstRandomRow = getRandomNumber(3);
  const firstRandomColumn = getRandomNumber(3);

  let secondRandomRow = getRandomNumber(3);
  let secondRandomColumn = getRandomNumber(3);

  while (
    firstRandomRow === secondRandomRow &&
    firstRandomColumn === secondRandomColumn
  ) {
    secondRandomRow = getRandomNumber(3);
    secondRandomColumn = getRandomNumber(3);
  }

  initialBoardMatrix[firstRandomRow][firstRandomColumn] = 2;
  initialBoardMatrix[secondRandomRow][secondRandomColumn] = 2;

  return initialBoardMatrix;
}

function getRandomNumber(max: number): number {
  return Math.floor(Math.random() * max);
}
