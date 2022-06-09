import moment from 'moment';
import 'moment/locale/ru';

export const formatTransactionDate = (date: Date, lang = 'en') => {
  const formatedDate = moment(date).locale(lang);

  if (formatedDate.isSame(new Date(), 'week')) {
    return formatedDate.fromNow();
  }

  return formatedDate.format('LL');
};
