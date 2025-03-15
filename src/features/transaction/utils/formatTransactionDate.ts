import dayjs from 'dayjs';

export const formatTransactionDate = (date: Date, lang = 'en') => {
  const formattedDate = dayjs(date).locale(lang);

  if (formattedDate.isSame(new Date(), 'week')) {
    return formattedDate.fromNow();
  }

  return formattedDate.format('LL');
};
