import {isArrayEqual} from './isArrayEqual';

describe('Test isArrayEqual', () => {
  it('should be defined', () => {
    expect(isArrayEqual).toBeDefined();
  });

  it('should works if non-array value provided', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(isArrayEqual(null, null)).toBeFalsy();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(isArrayEqual('', '')).toBeFalsy();
  });

  it('should work if same array provider', () => {
    expect(isArrayEqual([], [])).toBeTruthy();
    expect(isArrayEqual([1], [1])).toBeTruthy();
    expect(isArrayEqual([1, 2], [1, 2])).toBeTruthy();
    expect(isArrayEqual([2, 1], [1, 2])).toBeTruthy();
    expect(isArrayEqual([2, 1, 3], [1, 2, 3])).toBeTruthy();
  });

  it('should works if array length diff', () => {
    expect(isArrayEqual([1], [])).toBeFalsy();
    expect(isArrayEqual([], [1])).toBeFalsy();
    expect(isArrayEqual([1], [1, 2])).toBeFalsy();
  });
});
