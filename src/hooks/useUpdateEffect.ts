import {useEffect} from 'react';
import {useFirstMountedState} from './useFirstMountedState';

export const useUpdateEffect: typeof useEffect = (effect, deps) => {
  const isFirst = useFirstMountedState();

  useEffect(
    () => {
      if (!isFirst) {
        return effect();
      }
    },
    // Should not depend on isFirst state
    // eslint-disable-next-line react-hooks/exhaustive-deps
    deps
  );
};
