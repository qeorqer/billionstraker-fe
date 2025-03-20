import { FC } from 'react';
import Profile from 'assets/tabMenu/profile.svg?react';
import Transactions from 'assets/tabMenu/transactions.svg?react';
import Statistics from 'assets/tabMenu/statistics.svg?react';

type TabMenuItem = {
  title: string;
  link: string;
  Component: FC;
};

export const tabMenuItems: TabMenuItem[] = [
  {
    title: 'Profile',
    Component: Profile,
    link: '/home',
  },
  {
    title: 'New transaction',
    Component: Transactions,
    link: '/createTransaction',
  },
  {
    title: 'Statistics',
    Component: Statistics,
    link: '/statistics',
  },
];
