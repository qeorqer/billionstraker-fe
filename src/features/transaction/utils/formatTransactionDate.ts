import moment from 'moment';
import 'moment/locale/ru';

export const formatTransactionDate = (date: Date, lang = 'en') => {
  const formattedDate = moment(date).locale(lang);

  if (formattedDate.isSame(new Date(), 'week')) {
    return formattedDate.fromNow();
  }

  return formattedDate.format('LL');
};
