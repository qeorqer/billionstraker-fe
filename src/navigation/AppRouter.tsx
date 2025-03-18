import { useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router';
import Loader from 'components/Shared/Loader';
import { useAppSelector } from 'store/hooks';
import { userData } from 'features/user';
import { AuthRoutes, NoAuthRoutes } from 'navigation/constants';

const AppRouter = () => {
  const { isAuth, isRefreshLoading, user } = useAppSelector(userData);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth && user?.isFirstEnter) {
      navigate('/guide');
    }
  }, [isAuth, user]);

  const renderRoutes = ({ routes, redirect }: typeof AuthRoutes) => (
    <Routes>
      {routes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
      <Route path="*" element={<Navigate to={redirect} replace />} />
    </Routes>
  );

  if (isAuth === null || isRefreshLoading) {
    return <Loader fullHeight />;
  }

  return renderRoutes(isAuth ? AuthRoutes : NoAuthRoutes);
};

export default AppRouter;
