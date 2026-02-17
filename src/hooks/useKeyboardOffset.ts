import { useEffect, useState } from 'react';

export const useKeyboardOffset = () => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (!window.visualViewport) return;

    const vv = window.visualViewport;

    const update = () => {
      const keyboardHeight = window.innerHeight - vv.height - vv.offsetTop;
      setOffset(keyboardHeight > 0 ? keyboardHeight : 0);
    };

    vv.addEventListener('resize', update);
    vv.addEventListener('scroll', update);
    window.addEventListener('orientationchange', update);

    update();

    return () => {
      vv.removeEventListener('resize', update);
      vv.removeEventListener('scroll', update);
      window.removeEventListener('orientationchange', update);
    };
  }, []);

  return offset;
};
