import {renderHook} from '@testing-library/react-hooks';
import {useUpdateEffect} from './useUpdateEffect';

describe('Test useUpdateEffect', () => {
  it('should be defined', () => {
    expect(useUpdateEffect).toBeDefined();
  });

  it('should no run effect on first mount', () => {
    const effect = jest.fn();
    renderHook(() => useUpdateEffect(effect));
    expect(effect).not.toBeCalled();
  });

  it('should run effect on update', () => {
    const effect = jest.fn();
    const {rerender} = renderHook(() => useUpdateEffect(effect));
    expect(effect).not.toBeCalled();

    rerender();
    expect(effect).toBeCalledTimes(1);

    rerender();
    expect(effect).toBeCalledTimes(2);
  });

  it('should run cleanup on unmount', () => {
    const cleanup = jest.fn();
    const effect = jest.fn().mockReturnValue(cleanup);

    const {rerender, unmount} = renderHook(() => useUpdateEffect(effect));

    rerender();
    expect(cleanup).toHaveBeenCalledTimes(0);

    unmount();
    expect(cleanup).toHaveBeenCalledTimes(1);
  });
});
