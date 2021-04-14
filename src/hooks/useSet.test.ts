import {act, renderHook} from '@testing-library/react-hooks';
import useChunk from './useChunk';

describe('Test useChunk', () => {
  it('should use chunk', async () => {
    const {result} = renderHook(() => useChunk([1]));
  });
});
