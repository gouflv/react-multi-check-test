import {chunk} from './chunk';

/* eslint-disable @typescript-eslint/no-explicit-any */
describe('Test array chunk', () => {
  it('should be defined', () => {
    expect(chunk).toBeDefined();
    expect(typeof chunk).toBe('function');
  });

  it('should return empty array when got invalidate param', () => {
    expect(chunk(undefined as any)).toStrictEqual([]);
    expect(chunk(null as any)).toStrictEqual([]);
    expect(chunk(false as any)).toStrictEqual([]);
    expect(chunk('foo' as any)).toStrictEqual([]);
    expect(chunk({foo: 1} as any)).toStrictEqual([]);
  });

  it('should chunk array', () => {
    const arr = [1, 2, 3, 4, 5];
    const chunked = chunk(arr, 3);
    expect(chunked.length).toBe(3);
    expect(chunked[0]).toStrictEqual([1, 2]);
    expect(chunked[1]).toStrictEqual([3, 4]);
    expect(chunked[2]).toStrictEqual([5]);
  });

  it('should return single chunk when chunk count lower 1', () => {
    const arr = [1, 2, 3];
    const chunked = chunk(arr, 1);
    expect(chunked.length).toBe(1);
    expect(chunked[0]).toBe(arr);
  });

  it('should return chunks limit by array length when chunk count too large', () => {
    const arr = [1, 2, 3];
    const chunked = chunk(arr, 10);
    expect(chunked.length).toBe(3);
    expect(chunked[0]).toStrictEqual([1]);
    expect(chunked[1]).toStrictEqual([2]);
    expect(chunked[2]).toStrictEqual([3]);
  });
});