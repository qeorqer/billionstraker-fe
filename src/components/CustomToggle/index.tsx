import React, { ReactNode } from 'react';

import './styles.scss';

type propsType = {
  children?: ReactNode;
  onClick?: () => void;
};

const CustomToggle = React.forwardRef<HTMLDivElement>(
  ({ onClick }: propsType, ref) => (
    <div className="dropdownMenu">
      <div className="menuTogglerContainer" ref={ref} onClick={onClick}>
        <span />
      </div>
    </div>
  ),
);

export default CustomToggle;
