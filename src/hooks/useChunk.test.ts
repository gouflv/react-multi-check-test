import {renderHook} from '@testing-library/react-hooks';
import useChunk from './useChunk';

const setup = <T extends number>(initialValue?: T[], size = 1) =>
  renderHook(() => useChunk(initialValue, size));

describe('Test useChunk', () => {
  it('should be defined', () => {
    expect(useChunk).toBeDefined();
  });

  it('should initial chucks with value', async () => {
    const {result} = setup([1, 2, 3], 2);
    expect(result.current).toEqual([[1, 2], [3]]);
  });

  it('should memoized chunks', () => {
    const {result, rerender} = setup([1, 2, 3], 2);
    expect(result.current).toEqual([[1, 2], [3]]);

    rerender();
    expect(result.current).toEqual([[1, 2], [3]]);
  });

  it('should update chunks if value changed', () => {
    const {result, rerender} = renderHook(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (props: any) => useChunk(props.value, 2),
      {initialProps: {value: [1, 2, 3]}}
    );
    expect(result.current).toEqual([[1, 2], [3]]);

    rerender({value: [3, 2, 1]});
    expect(result.current).toEqual([[3, 2], [1]]);
  });

  it('should update chunks if size changed', () => {
    const value = [1, 2, 3];
    const {result, rerender} = renderHook(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (props: any) => useChunk(value, props.size),
      {initialProps: {size: 2}}
    );
    expect(result.current).toEqual([[1, 2], [3]]);

    rerender({size: 1});
    expect(result.current).toEqual([[1, 2, 3]]);
  });
});
