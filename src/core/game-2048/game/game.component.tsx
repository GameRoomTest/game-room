import { FunctionComponent } from 'react';

const Game: FunctionComponent<Props> = ({ className, onClickMenu }) => {
  return (
    <div className={className} id="asdasdsa">
      <header className="header" onClick={onClickMenu}>
        <div className="title-tile">2048</div>
      </header>

      <div className="game-body"></div>
    </div>
  );
};

export default Game;

interface Props extends StyledComponentProps {
  onClickMenu: () => void;
}
