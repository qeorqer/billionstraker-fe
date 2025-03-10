import { Container, Modal } from 'react-bootstrap';
import SelectTransactionType from 'features/transaction/components/SelectTransactionType';
import TransactionForm from 'features/transaction/components/TransactionForm';
import { FC, useState } from 'react';
import { Transaction, TransactionType } from 'features/transaction/types';
import { useTranslation } from 'react-i18next';

type EditTransactionModalProps = {
  isOpen: boolean;
  transaction: Transaction;
  handleClose: () => void;
};

const EditTransactionModal: FC<EditTransactionModalProps> = ({
  isOpen,
  transaction,
  handleClose,
}) => {
  const [transactionType, setTransactionType] = useState<TransactionType>(
    transaction.transactionType,
  );

  const { t } = useTranslation();

  return (
    <Modal show={isOpen} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('edit transaction')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <SelectTransactionType
            transactionType={transactionType}
            setTransactionType={setTransactionType}
            isModal
            initialValues={transaction}
          />
          <TransactionForm
            selectedTransactionType={transactionType}
            transaction={transaction}
            isModal
            onSuccess={handleClose}
          />
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default EditTransactionModal;
