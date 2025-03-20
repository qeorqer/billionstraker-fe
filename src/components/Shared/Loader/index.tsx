import { FC } from 'react';

import { Center, Loader as MantineLoader } from '@mantine/core';

type LoaderProps = {
  fullHeight?: boolean;
};

const Loader: FC<LoaderProps> = ({ fullHeight = false }) => {
  return (
    <Center
      py={10}
      bg="dark"
      style={{ minHeight: fullHeight ? '100vh' : undefined }}>
      <MantineLoader />
    </Center>
  );
};

export default Loader;
