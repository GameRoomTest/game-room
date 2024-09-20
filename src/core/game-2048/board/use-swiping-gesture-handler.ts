import { RefObject, useCallback, useEffect, useRef } from 'react';
import { Axis, Direction } from './types';

export const useSwipingGestureHandler = (
  motionHandler: MotionHandler,
  contextElement: RefObject<HTMLDivElement>,
) => {
  const motion = useRef<Motion>({
    start: {
      x: 0,
      y: 0,
    },
    end: {
      x: 0,
      y: 0,
    },
  });

  const handleGesture = useCallback(() => {
    const deltaX = motion.current.start.x - motion.current.end.x;
    const deltaY = motion.current.start.y - motion.current.end.y;

    const magnitudeX = Math.abs(deltaX);
    const magnitudeY = Math.abs(deltaY);

    const axis: Axis = magnitudeX > magnitudeY ? Axis.X : Axis.Y;

    let direction: Direction;

    if (axis === Axis.X) {
      direction = deltaX > 0 ? Direction.NEGATIVE : Direction.POSITIVE;
    } else {
      direction = deltaY > 0 ? Direction.NEGATIVE : Direction.POSITIVE;
    }

    motionHandler(axis, direction);
  }, [motionHandler]);

  useEffect(() => {
    function handleTouchStart(e: TouchEvent) {
      if (!contextElement.current?.contains(e.target as HTMLElement)) return;

      e.preventDefault();

      motion.current.start.x = e.touches[0].clientX;
      motion.current.start.y = e.touches[0].clientY;
    }

    function handleTouchEnd(e: TouchEvent) {
      if (!contextElement.current?.contains(e.target as HTMLElement)) return;

      e.preventDefault();

      motion.current.end.x = e.changedTouches[0].clientX;
      motion.current.end.y = e.changedTouches[0].clientY;

      handleGesture();
    }

    addEventListener('touchstart', handleTouchStart, { passive: false });
    addEventListener('touchend', handleTouchEnd, { passive: false });

    return () => {
      removeEventListener('touchstart', handleTouchStart);
      removeEventListener('touchend', handleTouchEnd);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleGesture, motionHandler]);
};

type MotionHandler = (axis: Axis, direction: Direction) => void;

interface Motion {
  start: {
    x: number;
    y: number;
  };
  end: {
    x: number;
    y: number;
  };
}
