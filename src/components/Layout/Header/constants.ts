import { FC } from 'react';
import { ReactComponent as Profile } from 'assets/tabMenu/profile.svg';
import { ReactComponent as Transactions } from 'assets/tabMenu/transactions.svg';
import { ReactComponent as Statistics } from 'assets/tabMenu/statistics.svg';

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
