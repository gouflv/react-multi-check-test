export function prop<P extends Record<string, string>>(
  key: string,
  defaultValue: string
) {
  return function (props: P): P[keyof P] | string {
    return typeof props[key] !== 'undefined' ? props[key] : defaultValue;
  };
}
