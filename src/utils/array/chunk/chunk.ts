export type ChunkResult<T> = Array<T[]>;

/**
 * Split an array into chunks.
 *
 * Note: chunks count param just a expectation, if array items less then chunk count,
 * the empty chunk will be ignore.
 *
 * @param {Array} value - array
 * @param {number} count - chunks count
 * @return {Array} chunks
 * @example
 *
 * chunk([1,2,3], 2)
 * // => [[1,2], [3]]
 *
 * chunk([1,2,3], 5)
 * // => [[1], [2], [3]]
 */
export const chunk = <T>(value: T[], count = 1): ChunkResult<T> => {
  if (!(Array.isArray(value) && value.length)) {
    return [];
  }

  if (count <= 1) {
    return [value];
  }

  if (count > value.length) {
    count = value.length;
  }

  const chunkSize = Math.ceil(value.length / count);

  return Array.from({length: count}).map((_, i) => {
    return value.slice(i * chunkSize, (i + 1) * chunkSize);
  });
};
