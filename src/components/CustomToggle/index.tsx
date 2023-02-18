import React, { ReactNode } from 'react';

import './styles.scss';

type propsType = {
  children?: ReactNode;
  onClick?: () => void;
  variant?: string;
};

const CustomToggle = React.forwardRef<HTMLDivElement>(
  ({ onClick, variant }: propsType, ref) => (
    <div className={`dropdownMenu ${variant && variant}`}>
      <div className="menuTogglerContainer" ref={ref} onClick={onClick}>
        <span />
      </div>
    </div>
  ),
);

export default CustomToggle;
