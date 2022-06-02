export const formattingNumber = (number: number): string =>
  String(number).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
