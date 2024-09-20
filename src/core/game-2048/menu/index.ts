import styled from 'styled-components';
import Menu from './menu.component';

export default styled(Menu)`
  display: flex;
  flex-direction: column;
  height: 100%;

  .menu-title {
    font-size: 3rem;
    font-weight: 700;
    text-align: center;
  }

  .action-buttons-container {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
  }

  .button {
    width: 100%;
    padding: 0.5rem;
    font-size: 2rem;

    // reset default styles
    border: none;
    background: unset;

    color: #fff;
    background-color: #a39386;
    border-radius: var(--border-radius-size);

    &.new-game {
      background-color: #efc83b;
    }
  }
`;
