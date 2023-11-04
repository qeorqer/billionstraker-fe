import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import { balanceData, createBalanceThunk } from 'features/balance';

import BalancePageView from './view';

const BalancePage = () => {
  const { t } = useTranslation();
  const { balances } = useAppSelector(balanceData);

  return <BalancePageView t={t} hasBalances={balances.length > 0} />;
};

export default BalancePage;
