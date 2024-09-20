import styled from 'styled-components';
import Score from './score.component';

export default styled(Score)`
  display: flex;
  gap: 1rem;

  .tile {
    background-color: #a39183;
    color: #fff;
    font-weight: 700;
    aspect-ratio: 1/1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    height: 100px;
    border-radius: 0.25rem;
  }

  .score-box {
    display: flex;
    flex-direction: column;
    align-items: center;

    .title {
      font-size: 1rem;
      font-weight: 500;
    }
  }
`;
