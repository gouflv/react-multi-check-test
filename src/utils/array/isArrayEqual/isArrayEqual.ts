export const isArrayEqual = <T>(a?: T[], b?: T[]): boolean => {
  if (!(Array.isArray(a) && Array.isArray(b))) {
    return false;
  }

  if (a.length !== b.length) {
    return false;
  }

  return a.every((item) => {
    return !!b.find((it) => Object.is(it, item));
  });
};
