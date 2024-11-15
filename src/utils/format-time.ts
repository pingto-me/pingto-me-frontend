import { format } from 'date-fns';

type InputValue = Date | string | number | null | undefined;

export function secondsToMidnight() {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setDate(midnight.getDate() + 1);
  midnight.setHours(0, 0, 0, 0);

  const diffInMilliseconds = midnight.getTime() - now.getTime();
  return Math.floor(diffInMilliseconds / 1000);
}

export function fDate(date: InputValue, newFormat?: string) {
  const fm = newFormat || 'dd/MM/yyyy HH:mm:ss';

  return date ? format(new Date(date), fm) : '';
}
