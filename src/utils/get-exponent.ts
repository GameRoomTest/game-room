export const getExponent = (total?: number, base = 2): number | undefined => {
  if (!total) return undefined;

  return Math.log(total) / Math.log(base) - 1;
};
