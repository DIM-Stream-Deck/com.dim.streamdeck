/**
 *
 * @param current current selected element
 * @param available available elements
 * @returns next element in the array (cyclic)
 */
export const next = <const T>(
  current: T,
  available: ReadonlyArray<NonNullable<T>>
) => {
  const idx = Math.max(0, !current ? 0 : available.indexOf(current));
  return available[(idx + 1) % available.length];
};
