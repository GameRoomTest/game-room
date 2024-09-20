import { FunctionComponent } from 'react';

import Score from 'src/core/game-2048/score';
import Board from 'src/core/game-2048/board';
import { useGame2048Store } from 'src/state/game-2048';

const Game: FunctionComponent<Props> = ({ className, onClickMenu }) => {
  const resetScore = useGame2048Store((state) => state.resetScore);

  const _onClickMenu = () => {
    onClickMenu();
    resetScore();
  };

  return (
    <div className={className}>
      <header className="header">
        <div className="game-title-tile" onClick={_onClickMenu}>
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
