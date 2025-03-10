import { useTranslation } from 'react-i18next';

import { useAppSelector } from 'store/hooks';
import { balanceData } from 'features/balance';

import BalancePageView from './view';

const BalancePage = () => {
  const { t } = useTranslation();
  const { balances } = useAppSelector(balanceData);

  return <BalancePageView t={t} hasBalances={balances.length > 0} />;
};

export default BalancePage;
