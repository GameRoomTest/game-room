import styled, { css } from 'styled-components';
import Tile from './tile.component';
import { colors, columnLength, rowLength } from '../fixtures';

const getTilePositionStyles = () => {
  let styles = '';

  for (let y = 0; y < columnLength; y++) {
    for (let x = 0; x < rowLength; x++) {
      // gap = 0.5rem
      const gap =
        parseFloat(getComputedStyle(document.documentElement).fontSize) / 2;

      styles += `
        &.position-${x}-${y} {
          transform: translate(
            calc(${gap * x}px + (var(--tile-width, 0) * ${x})),
            calc(${gap * y}px + (var(--tile-height, 0) * ${y}))
          );
        }
      `;
    }
  }

  return css`
    ${styles}
  `;
};

const getTileColorsStyles = () => {
  let styles = '';

  colors.forEach((color, i) => {
    styles += `
      &.tile-exp-${i} .tile {
        background-color: ${color};
        ${[0, 1].includes(i) ? 'color: #766f61' : ''}
      }
    `;
  });

  return css`
    ${styles}
  `;
};

export default styled(Tile)`
  position: absolute;
  transition: 100ms ease-in-out;
  width: var(--tile-width, 0);
  height: var(--tile-height, 0);

  .tile {
    border-radius: var(--border-radius-size);
    color: #fff;
    font-weight: 700;
    font-size: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;

    &.new-tile {
      animation: apper 200ms ease-in-out 100ms backwards;
    }
  }

  ${getTilePositionStyles()}

  ${getTileColorsStyles()}

  @keyframes apper {
    0% {
      opacity: 0;
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
`;
