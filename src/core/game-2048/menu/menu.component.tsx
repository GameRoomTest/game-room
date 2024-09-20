import { FunctionComponent } from 'react';

const Menu: FunctionComponent<Props> = ({ className, onClickNewGame }) => {
  return (
    <div className={className}>
      <h1 className="menu-title">Menu</h1>

      <div className="action-buttons-container">
        <button className="new-game button" onClick={onClickNewGame}>
          New Game
        </button>
        <button className="options button">Options</button>
      </div>
    </div>
  );
};

export default Menu;

interface Props extends StyledComponentProps {
  onClickNewGame: () => void;
}
