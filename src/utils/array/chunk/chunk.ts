export const chunk = <T>(value: T[], count = 1): Array<T[]> => {
  if (!Array.isArray(value)) {
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