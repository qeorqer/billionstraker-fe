import { SwiperSlide } from 'swiper/react';
import { Card, Dropdown } from 'react-bootstrap';
import { formattingSum } from 'features/transaction/utils/formattingSum';
import CustomToggle from 'components/Shared/CustomToggle';
import React, { FC, useState } from 'react';
import { Balance } from 'features/balance/types';
import { useTranslation } from 'react-i18next';
import { deleteBalanceThunk } from 'features/balance/store/thunks';
import EditBalanceModal from 'features/balance/components/EditBalanceModal';
import { useAppDispatch } from 'store/hooks';

type BalanceListItemProps = {
  balance: Balance;
  showMenu: boolean;
};

type DropdownOption = {
  onClick: () => void;
  title: string;
};

const BalanceListItem: FC<BalanceListItemProps> = ({ balance, showMenu }) => {
  const [isEditBalanceModalOpen, setIsEditBalanceModalOpen] = useState(false);

  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const options: DropdownOption[] = [
    {
      title: 'edit',
      onClick: () => setIsEditBalanceModalOpen(true),
    },
    {
      title: 'remove',
      onClick: () => dispatch(deleteBalanceThunk({ balanceId: balance._id })),
    },
  ];

  return (
    <>
      <Card className="h-100">
        <Card.Body className="d-flex justify-content-between">
          <div>
            <Card.Title>{balance.name}</Card.Title>
            <Card.Text>
              {`${t('balance')}: ${formattingSum(balance.amount)}`}
            </Card.Text>
          </div>
          {showMenu && (
            <Dropdown drop="start">
              <Dropdown.Toggle as={CustomToggle} />
              <Dropdown.Menu>
                {options.map(({ title, onClick }) => (
                  <Dropdown.Item as="span" onClick={onClick} key={title}>
                    {t(title)}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          )}
        </Card.Body>
      </Card>
      <EditBalanceModal
        handleClose={() => setIsEditBalanceModalOpen(false)}
        balance={balance}
        isOpen={isEditBalanceModalOpen}
      />
    </>
  );
};

export default BalanceListItem;
