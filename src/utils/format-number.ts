import numeral from 'numeral';

type InputValue = string | number | null;

export function fData(inputValue: InputValue) {
  if (!inputValue) return '';

  if (inputValue === 0) return '0 Bytes';

  const units = ['bytes', 'Kb', 'Mb', 'Gb', 'Tb', 'Pb', 'Eb', 'Zb', 'Yb'];

  const decimal = 2;

  const baseValue = 1024;

  const number = Number(inputValue);

  const index = Math.floor(Math.log(number) / Math.log(baseValue));

  const fm = `${parseFloat((number / baseValue ** index).toFixed(decimal))} ${units[index]}`;

  return fm;
}

export const fNumber = (number: number) =>
  numeral(number).format(isFloat(+number) ? '0,0.00' : '0,0');

export const isFloat = (num: number) => Number(num) === num && !Number.isInteger(num);
