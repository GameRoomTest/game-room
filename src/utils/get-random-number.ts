export function getRandomValue<T>(values: T[], except: T[] = []): T {
  const _values = values.filter((x) => !except?.includes(x));

  const randomIndex = Math.floor(Math.random() * _values.length);

  return _values[randomIndex];
}
