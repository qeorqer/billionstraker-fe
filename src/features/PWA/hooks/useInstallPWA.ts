import { useEffect, useState } from 'react';

export const UseInstallPWA = () => {
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState(null);

  const installPWA = () => {
    if (!promptInstall) {
      return;
    }

    // @ts-ignore
    promptInstall.prompt();
  };

  useEffect(() => {
    const handler = (e: any) => {
      console.log(e);
      e.preventDefault();
      setSupportsPWA(true);
      setPromptInstall(e);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('transitionend', handler);
  }, []);

  return { supportsPWA, installPWA };
};
