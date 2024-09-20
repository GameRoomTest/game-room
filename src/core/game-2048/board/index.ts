import styled from 'styled-components';
import Board from './board.component';
import { colors } from './fixtures';

export default styled(Board)`
  width: 100%;
  aspect-ratio: 1/1;
  background-color: #a39183;
  border-radius: var(--border-radius-size);

  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 0.5rem;
  padding: 0.5rem;

  .tile {
    background-color: #beae9f;
    border-radius: var(--border-radius-size);
    color: #fff;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
  }
  ${colors.map(
  (color, i) => `
      .tile.tile-exp-${i} {
        background-color: ${color};
        ${[0, 1].includes(i) ? 'color: #766f61' : ''}
      }
    `,
)}
`;
