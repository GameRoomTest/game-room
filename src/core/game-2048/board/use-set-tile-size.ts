import { useEffect, useRef } from 'react';

export const useSetTileSize = () => {
  const tileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const widthSize = tileRef.current?.clientWidth;
    const heightSize = tileRef.current?.clientHeight;

    if (!widthSize || !heightSize) return;

    const element = document.getElementById('tiles-container');
    element?.style.setProperty('--tile-width', `${widthSize}px`);
    element?.style.setProperty('--tile-height', `${heightSize}px`);
  }, []);

  return tileRef;
};
