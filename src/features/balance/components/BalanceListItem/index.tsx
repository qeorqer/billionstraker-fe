import { Card } from 'react-bootstrap';
import { formatSum } from 'features/transaction/utils/formatSum';
import { FC, useState } from 'react';
import { Balance } from 'features/balance/types';
import EditBalanceModal from 'features/balance/components/EditBalanceModal';
import { getCurrencyLabel } from 'features/currency/utils/getCurrencyLabel';
import DeleteBalanceModal from 'features/balance/components/DeleteBalanceModal';

import './styles.scss';

type BalanceListItemProps = {
  balance: Balance;
  showMenu: boolean;
};

type ActionOption = {
  onClick: () => void;
  classes: string;
};

const BalanceListItem: FC<BalanceListItemProps> = ({ balance, showMenu }) => {
  const [isEditBalanceModalOpen, setIsEditBalanceModalOpen] = useState(false);
  const [isDeleteBalanceModalOpen, setIsDeleteBalanceModalOpen] =
    useState(false);

  const options: ActionOption[] = [
    {
      classes: 'bi bi-pencil text-dark mx-1',
      onClick: () => setIsEditBalanceModalOpen(true),
    },
    {
      classes: 'bi bi-x-lg text-dark',
      onClick: () => setIsDeleteBalanceModalOpen(true),
    },
  ];

  return (
    <>
      <Card className="h-100">
        <Card.Body className="d-flex justify-content-between balance-card-body-content">
          <div className="pr-1 flex-grow-1">
            <Card.Title className="balance-card-body-title" as="p">
              {balance.name}
            </Card.Title>
            <Card.Text className="balance-card-body-amount">
              {`💰: ${formatSum(balance.amount)}`}
            </Card.Text>
            {balance.currency && (
              <Card.Text className="balance-card-body-currency">
                {`💲: ${getCurrencyLabel(balance.currency)}`}
              </Card.Text>
            )}
          </div>
          {showMenu && (
            <div className="d-flex flex-column align-items-end justify-content-center">
              {options.map(({ classes, onClick }, index) => (
                <div
                  key={index}
                  onClick={onClick}
                  className="balance-action-button"
                >
                  <i className={classes} />
                </div>
              ))}
            </div>
          )}
        </Card.Body>
      </Card>
      <EditBalanceModal
        isOpen={isEditBalanceModalOpen}
        handleClose={() => setIsEditBalanceModalOpen(false)}
        balance={balance}
      />
      <DeleteBalanceModal
        isOpen={isDeleteBalanceModalOpen}
        handleClose={() => setIsDeleteBalanceModalOpen(false)}
        balance={balance}
      />
    </>
  );
};

export default BalanceListItem;
