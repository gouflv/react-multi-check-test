import {chunk} from './chunk';

/* eslint-disable @typescript-eslint/no-explicit-any */
describe('Test array chunk', () => {
  it('should be defined', () => {
    expect(chunk).toBeDefined();
    expect(typeof chunk).toBe('function');
  });

  it('should return empty chunk if invalidate value provided', () => {
    expect(chunk(undefined as any)).toStrictEqual([]);
    expect(chunk(null as any)).toStrictEqual([]);
    expect(chunk(false as any)).toStrictEqual([]);
    expect(chunk('foo' as any)).toStrictEqual([]);
    expect(chunk({foo: 1} as any)).toStrictEqual([]);
  });

  it('should return empty chunk if if empty array provided', () => {
    expect(chunk([])).toStrictEqual([]);
    expect(chunk([], 2)).toStrictEqual([]);
  });

  it('should chunk array', () => {
    const arr = [1, 2, 3, 4, 5];
    const chunked = chunk(arr, 3);
    expect(chunked.length).toBe(3);
    expect(chunked[0]).toStrictEqual([1, 2]);
    expect(chunked[1]).toStrictEqual([3, 4]);
    expect(chunked[2]).toStrictEqual([5]);
  });

  it('should return single chunk if count lower 1', () => {
    const arr = [1, 2, 3];
    const chunked = chunk(arr, 1);
    expect(chunked.length).toBe(1);
    expect(chunked[0]).toBe(arr);
  });

  it('should return chunks that size limit to length of array if count too large', () => {
    const arr = [1, 2, 3];
    const chunked = chunk(arr, 10);
    expect(chunked.length).toBe(3);
    expect(chunked[0]).toStrictEqual([1]);
    expect(chunked[1]).toStrictEqual([2]);
    expect(chunked[2]).toStrictEqual([3]);
  });
});
