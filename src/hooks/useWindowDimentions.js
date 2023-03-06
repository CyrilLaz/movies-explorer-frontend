import { useState, useEffect, useCallback } from 'react';

export default function useWindowDimensions() {
  const hasWindow = typeof window !== 'undefined';

  const getWindowDimensions = useCallback(() => {
    const width = hasWindow ? window.innerWidth : null;
    const height = hasWindow ? window.innerHeight : null;
    // console.log('tra');
    return {
      width,
      height,
    };
  }, [hasWindow]);

  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    if (hasWindow) {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
        // setTimeout(()=>handleResize(),200)
        // console.log('Hi')
      }
      function delayHandle() {
        setTimeout(() => handleResize(), 1000);
      }
      // setTimeout(()=>window.addEventListener('resize', handleResize),5000)
      window.addEventListener(
        'resize',()=>
        setTimeout(() => delayHandle()),
        5000
      );
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [hasWindow, getWindowDimensions]);

  return windowDimensions;
}
