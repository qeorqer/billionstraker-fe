export const formatSum = (number: number): string =>
  String(number.toFixed(2)).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
