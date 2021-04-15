import {renderHook, act} from '@testing-library/react-hooks';
import useSet from './useSet';

const setup = <T>(initial?: Set<T>) => renderHook(() => useSet(initial));

describe('Test useSet', () => {
  it('should use set', async () => {
    const {result} = setup();
    expect(result.current.value instanceof Set).toBeTruthy();
    expect(typeof result.current.actions.add).toBe('function');
    expect(typeof result.current.actions.remove).toBe('function');
    expect(typeof result.current.actions.has).toBe('function');
  });

  it('should initial empty set if no init value provided', () => {
    const {result} = setup();
    expect(result.current.value.size).toBe(0);
  });

  it('should initial set with value', () => {
    const {result} = setup(new Set([1]));
    let res = false;
    act(() => {
      res = result.current.actions.has(1);
    });
    expect(res).toBeTruthy();
  });

  it('should have add an value', () => {
    const {result} = setup(new Set([1]));
    act(() => {
      result.current.actions.add(2);
    });
    let res = false;
    act(() => {
      res = result.current.actions.has(2);
    });
    expect(res).toBeTruthy();
  });

  it('should work if add an existing value', () => {
    const {result} = setup(new Set([1]));
    act(() => {
      result.current.actions.add(1);
    });
    expect(result.current.value).toEqual(new Set([1]));
  });

  it('should remove an value', () => {
    const {result} = setup(new Set([1, 2, 3]));
    act(() => {
      result.current.actions.remove(2);
    });
    expect(result.current.value).toEqual(new Set([1, 3]));
  });

  it('should memoized actions method', () => {
    const {result} = setup(new Set([1]));
    const {add, remove} = result.current.actions;
    act(() => {
      add(2);
    });
    expect(result.current.actions.add).toBe(add);
    expect(result.current.actions.remove).toBe(remove);
  });
});
