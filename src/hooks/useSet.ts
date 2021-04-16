import {useCallback, useMemo, useState} from 'react';

type Actions<T> = {
  add: (item: T) => void;
  remove: (item: T) => void;
  has: (item: T) => boolean;
};

/**
 * React state hook that tracks a Set.
 *
 * Do not use the actions object directly, it's not been memoized.
 *
 * @param {Set} initialValue
 * @return {[ Set, Actions ]}
 *
 * @example
 *
 * // Right
 * const [value, { add, remove, has }] = useSet(new Set(['foo', 'bar']))
 *
 * // Wrong
 * const [value, actions] = useSet()
 */
const useSet = <T>(initialValue = new Set<T>()): [Set<T>, Actions<T>] => {
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

  return [
    value,
    {
      ...setters,
      has
    }
  ];
};

export default useSet;
