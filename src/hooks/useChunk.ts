import {useState} from 'react';
import {chunk, ChunkResult} from '../utils/array/chunk/chunk';
import {useUpdateEffect} from './useUpdateEffect';

const useChunk = <T>(value: T[] = [], size = 1): ChunkResult<T> => {
  const [chunks, set] = useState<ChunkResult<T>>(() => chunk(value, size));

  useUpdateEffect(() => {
    set(chunk(value, size));
  }, [size, value]);

  return chunks;
};

export default useChunk;
