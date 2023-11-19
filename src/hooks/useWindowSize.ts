import { useEffect, useState } from 'react';
import { ScreenSizes } from '@/styles';

interface WindowSize {
  width: number;
  height: number;
}

// Hook => courtesy of https://usehooks.com/useWindowSize/
const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: 1000,
    height: 1000,
  });

  useEffect(() => {
    function handleResize() {
      if (typeof window !== 'undefined') {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
    }
    window.addEventListener('resize', handleResize);
    window.addEventListener('load', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('load', handleResize);
    };
  }, []);
  return windowSize;
};

export default useWindowSize;

export const useIsMobileMode = () => {
  const { width: windowWidth } = useWindowSize();
  const mobileMode = (windowWidth && windowWidth < ScreenSizes.sm) || (windowWidth && windowWidth < ScreenSizes.xl);
  return mobileMode;
};
