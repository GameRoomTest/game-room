import { FunctionComponent, useState } from 'react';

import Menu from 'src/core/game-2048/menu';
import Game from 'src/core/game-2048/game';
import { Page } from './types';

const Game2048: FunctionComponent<StyledComponentProps> = ({ className }) => {
  const [page, setPage] = useState(Page.Menu);

  return (
    <div className={className}>
      <div className="body-container">
        {page === Page.Menu && (
          <Menu onClickNewGame={() => setPage(Page.Game)} />
        )}

        {page === Page.Game && <Game onClickMenu={() => setPage(Page.Menu)} />}
      </div>
    </div>
  );
};

export default Game2048;
