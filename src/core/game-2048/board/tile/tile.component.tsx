import { FunctionComponent, useEffect, useRef } from 'react';
import { getExponent } from 'src/utils/get-exponent';

const Tile: FunctionComponent<Props> = ({ className, value, x, y }) => {
  const isNew = useRef(true);

  useEffect(() => {
    isNew.current = false;
  }, []);

  return (
    <div
      // eslint-disable-next-line max-len
      className={`${className} position-${x}-${y} tile-exp-${getExponent(value)}`}
    >
      <div className={`tile ${isNew ? 'new-tile' : ''}`}>{value}</div>
    </div>
  );
};

export default Tile;

interface Props extends StyledComponentProps {
  x: number;
  y: number;
  value: number;
}
