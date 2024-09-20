import { FunctionComponent } from 'react';
import Score from 'src/core/game-2048/score';
import Board from 'src/core/game-2048/board';

const Game: FunctionComponent<Props> = ({ className, onClickMenu }) => {
  return (
    <div className={className}>
      <header className="header">
        <div className="game-title-tile" onClick={onClickMenu}>
          2048
        </div>
        <Score />
      </header>

      <div className="game-body">
        <Board />
      </div>
    </div>
  );
};

export default Game;

interface Props extends StyledComponentProps {
  onClickMenu: () => void;
}
