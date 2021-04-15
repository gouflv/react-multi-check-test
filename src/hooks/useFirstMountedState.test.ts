import {renderHook} from '@testing-library/react-hooks';
import {useFirstMountedState} from './useFirstMountedState';

describe('Test useFirstMountedState', () => {
  it('should be defined', () => {
    expect(useFirstMountedState).toBeDefined();
  });

  it('should return true on first render', () => {
    const {result} = renderHook(() => useFirstMountedState());
    expect(result.current).toBe(true);
  });

  it('should return false on re-render', () => {
    const {result, rerender} = renderHook(() => useFirstMountedState());
    expect(result.current).toBe(true);

    rerender();
    expect(result.current).toBe(false);

    rerender();
    expect(result.current).toBe(false);
  });
});
