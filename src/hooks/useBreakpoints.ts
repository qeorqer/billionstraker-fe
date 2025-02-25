import { useCallback, useEffect, useMemo, useState } from 'react';
import { BREAKPOINTS } from 'constants/breakpoints';

export const useBreakpoints = (): keyof typeof BREAKPOINTS | undefined => {
  const searchBreakpoint = useCallback(
    (breakpoints: { key: string; value: number }[]) => {
      return breakpoints.find((x) => window.innerWidth < x.value)?.key as
        | keyof typeof BREAKPOINTS
        | undefined;
    },
    [],
  );

  const entries = useMemo(() => {
    return Object.entries(BREAKPOINTS)
      .sort((a, b) => a[1] - b[1])
      .map(([key, value]) => ({ key, value }));
  }, [BREAKPOINTS]);

  const [breakpoint, setBreakpoint] = useState(searchBreakpoint(entries));

  useEffect(() => {
    const onResize = () => {
      setBreakpoint(searchBreakpoint(entries));
    };
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, [entries, searchBreakpoint]);

  return breakpoint;
};
