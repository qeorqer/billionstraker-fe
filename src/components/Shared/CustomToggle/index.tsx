import { forwardRef, ReactNode } from 'react';

import 'components/Shared/CustomToggle/styles.scss';

type propsType = {
  children?: ReactNode;
  onClick?: () => void;
  variant?: string;
};

const CustomToggle = forwardRef<HTMLDivElement>(
  ({ onClick, variant }: propsType, ref) => (
    <div className={`dropdownMenu ${variant && variant}`}>
      <div className="menuTogglerContainer" ref={ref} onClick={onClick}>
        <span />
      </div>
    </div>
  ),
);

export default CustomToggle;
