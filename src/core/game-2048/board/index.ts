import styled from 'styled-components';
import Board from './board.component';
import { columnLength, rowLength } from './fixtures';

export default styled(Board)`
  width: 100%;
  aspect-ratio: 1/1;
  background-color: #a39183;
  border-radius: var(--border-radius-size);
  position: relative;

  .tiles-back {
    display: grid;
    grid-template-columns: repeat(${rowLength}, 1fr);
    grid-template-rows: repeat(${columnLength}, 1fr);
    gap: 0.5rem;
    padding: 0.5rem;
    height: 100%;

    .tile-back {
      border-radius: var(--border-radius-size);
      background-color: #beae9f;
    }
  }

  .tiles-container {
    padding: 0.5rem;
    position: absolute;
    top: 0;
    left: 0;
  }
`;
