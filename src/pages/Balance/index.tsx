import { useTranslation } from 'react-i18next';

import BalancePageView from './view';

const BalancePage = () => {
  const { t } = useTranslation();

  return <BalancePageView t={t} />;
};

export default BalancePage;
