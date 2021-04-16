import {renderHook, act} from '@testing-library/react-hooks';
import useSet from './useSet';

const setup = <T>(initial?: Set<T>) => renderHook(() => useSet(initial));

describe('Test useSet', () => {
  it('should use set', async () => {
    const {result} = setup();
    const [value, {add, remove, has}] = result.current;
    expect(value instanceof Set).toBeTruthy();
    expect(typeof add).toBe('function');
    expect(typeof remove).toBe('function');
    expect(typeof has).toBe('function');
  });

  it('should initial empty set if no init value provided', () => {
    const {result} = setup();
    expect(result.current[0].size).toBe(0);
  });

  it('should initial set with value', () => {
    const {result} = setup(new Set([1]));
    let res = false;
    act(() => {
      res = result.current[1].has(1);
    });
    expect(res).toBeTruthy();
  });

  it('should have add an value', () => {
    const {result} = setup(new Set([1]));
    act(() => {
      result.current[1].add(2);
    });
    let res = false;
    act(() => {
      res = result.current[1].has(2);
    });
    expect(res).toBeTruthy();
  });

  it('should work if add an existing value', () => {
    const {result} = setup(new Set([1]));
    act(() => {
      result.current[1].add(1);
    });
    expect(result.current[0]).toEqual(new Set([1]));
  });

  it('should remove an value', () => {
    const {result} = setup(new Set([1, 2, 3]));
    act(() => {
      result.current[1].remove(2);
    });
    expect(result.current[0]).toEqual(new Set([1, 3]));
  });

  it('should memoized actions methods', () => {
    const {result} = setup(new Set([1]));
    const {add, remove} = result.current[1];
    act(() => {
      add(2);
    });
    expect(result.current[1].add).toBe(add);
    expect(result.current[1].remove).toBe(remove);
  });
});
