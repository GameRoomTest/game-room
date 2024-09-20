import styled from 'styled-components';
import Game from './game.component';

export default styled(Game)`
  height: 100%;
  display: flex;
  flex-direction: column;

  .header {
    display: flex;
  }

  .title-tile {
    color: #fff;
    font-weight: 700;
    background-color: #e6c864;
    aspect-ratio: 1/1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    width: 25%;
    border-radius: 0.25rem;
  }

  .game-body {
    flex-grow: 1;
  }
`;
