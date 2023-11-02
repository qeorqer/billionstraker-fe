import React, { FC } from 'react';

import loaderImage from 'assets/common/loader.gif';

import 'components/Shared/Loader/styles.scss';

type propsType = {
  fullHeight?: boolean;
};

const Loader: FC<propsType> = ({ fullHeight }) => {
  return (
    <div
      className={`d-flex align-items-center justify-content-center pt-2
    ${fullHeight ? 'fullHeight' : ''} 
    `}>
      <img src={loaderImage} alt="loader img" />
    </div>
  );
};

export default Loader;
