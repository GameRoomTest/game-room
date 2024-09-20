import styled from 'styled-components';
import Game2048 from './game-2048.component';

export default styled(Game2048)`
  * {
    font-family: Rajdhani;
  }

  --border-radius-size: 0.25rem;

  background-color: #fbf5e9;
  min-height: 100dvh;

  .body-container {
    padding: 2rem;
    width: 100%;
    max-width: 500px;
    margin: auto;

    display: flex;
    flex-direction: column;
    height: 100dvh;
  }
`;
