import {useEffect, useState} from 'react';
import {chunk, ChunkResult} from '../utils/array/chunk/chunk';

export const useChunks = <T>(
  value: T[],
  size = 1
): {
  chunks: ChunkResult<T>;
} => {
  const [chunks, set] = useState<ChunkResult<T>>([]);

  useEffect(() => {
    set(chunk(value, size));
  }, []);

  return {
    chunks
  };
};
