import { FC } from 'react';
import StatisticsPage from 'pages/Statistics';
import CreateTransaction from 'pages/CreateTransaction';
import ProfilePage from 'pages/Profile';
import GuidePage from 'pages/Guide';
import BalancePage from 'pages/Balance';
import CategoryPage from 'pages/Category';
import AuthorizationPage from 'pages/Authorization';
import AboutPage from 'pages/About';

type Route = {
  path: string;
  Component: FC;
};

type RoutesConfig = {
  routes: Route[];
  redirect: string;
};

export const AuthRoutes: RoutesConfig = {
  routes: [
    { path: '/home', Component: ProfilePage },
    { path: '/createTransaction', Component: CreateTransaction },
    { path: '/statistics', Component: StatisticsPage },
    { path: '/balance', Component: BalancePage },
    { path: '/category', Component: CategoryPage },
    { path: '/guide', Component: GuidePage },
  ],
  redirect: '/home',
};

export const NoAuthRoutes: RoutesConfig = {
  routes: [
    { path: '/authorization', Component: AuthorizationPage },
    { path: '/about', Component: AboutPage },
  ],
  redirect: '/authorization',
};
