import {useCallback, useMemo, useState} from 'react';

const useSet = <T>(
  initialValue = new Set<T>()
): {
  value: Set<T>;
  actions: {
    add: (item: T) => void;
    remove: (item: T) => void;
    has: (item: T) => boolean;
  };
} => {
  const [value, setValue] = useState(initialValue);

  const setters = useMemo(() => {
    const add = (item: T) => setValue((prev) => new Set([...prev, item]));
    const remove = (item: T) =>
      setValue((prev) => new Set([...prev].filter((it) => it !== item)));

    return {
      add,
      remove
    };
  }, []);

  const has = useCallback(
    (item: T) => {
      return value.has(item);
    },
    [value]
  );

  return {
    value,
    actions: {
      ...setters,
      has
    }
  };
};

export default useSet;
