import { useEffect } from 'react';
import { Axis, Direction } from './types';

export const useKeyDownHandler = (motionHandler: MotionHandler) => {
  useEffect(() => {
    function keyDownHandler(e: KeyboardEvent) {
      if (e.key === 'ArrowUp') {
        motionHandler(Axis.Y, Direction.NEGATIVE);
      }
      if (e.key === 'ArrowDown') {
        motionHandler(Axis.Y, Direction.POSITIVE);
      }
      if (e.key === 'ArrowLeft') {
        motionHandler(Axis.X, Direction.NEGATIVE);
      }
      if (e.key === 'ArrowRight') {
        motionHandler(Axis.X, Direction.POSITIVE);
      }
    }

    addEventListener('keydown', keyDownHandler);

    return () => {
      removeEventListener('keydown', keyDownHandler);
    };
  }, [motionHandler]);
};

type MotionHandler = (axis: Axis, direction: Direction) => void;
