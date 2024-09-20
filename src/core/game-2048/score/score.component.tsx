import { FunctionComponent } from 'react';
import { useGame2048Store } from 'src/state/game-2048';

const Score: FunctionComponent<StyledComponentProps> = ({ className }) => {
  const score = useGame2048Store((state) => state.score);
  const bestScore = useGame2048Store((state) => state.best);

  return (
    <div className={className}>
      <div className="score-box tile">
        <div className="title">SCORE</div>
        <div className="score">{score}</div>
      </div>
      <div className="score-box tile">
        <div className="title">BEST</div>
        <div className="best-score">{bestScore}</div>
      </div>
    </div>
  );
};

export default Score;
