export const checkIsAccessTokenExpired = (): boolean => {
  const bufferTimeForRefreshToken = 1000 * 60;
  const accessExpiration = localStorage.getItem('accessExpiration');

  const refreshTime = Date.now() + bufferTimeForRefreshToken;
  return refreshTime >= Number(accessExpiration);
};
