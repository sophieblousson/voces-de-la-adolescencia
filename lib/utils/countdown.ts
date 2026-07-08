export type CountdownParts = {
  months: number;
  days: number;
  totalMs: number;
  isPast: boolean;
};

/**
 * Calcula meses y días calendario reales entre "ahora" y una fecha objetivo,
 * en vez de dividir milisegundos por una aproximación fija (30 días = 1 mes),
 * que da resultados incorrectos según el mes en curso.
 */
export function getCountdownParts(
  targetISO: string,
  nowMs: number = Date.now()
): CountdownParts {
  const targetMs = new Date(targetISO).getTime();
  const diff = targetMs - nowMs;

  if (diff <= 0) {
    return { months: 0, days: 0, totalMs: 0, isPast: true };
  }

  const now = new Date(nowMs);
  const end = new Date(targetMs);

  let months =
    (end.getFullYear() - now.getFullYear()) * 12 +
    (end.getMonth() - now.getMonth());

  const cursor = new Date(now);
  cursor.setMonth(cursor.getMonth() + months);

  if (cursor.getTime() > end.getTime()) {
    months -= 1;
    cursor.setMonth(cursor.getMonth() - 1);
  }

  const msRemainder = end.getTime() - cursor.getTime();
  const days = Math.floor(msRemainder / (1000 * 60 * 60 * 24));

  return { months, days, totalMs: diff, isPast: false };
}
