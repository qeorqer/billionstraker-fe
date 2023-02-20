import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { transactionType, transactionTypes } from 'types/transaction.type';

type propsType = {
  transactionType: transactionTypes;
  setTransactionType: Dispatch<SetStateAction<transactionTypes>>;
  isModal?: boolean;
  initialValues?: transactionType | null;
};

const SelectTransactionType: React.FC<propsType> = ({
  transactionType,
  setTransactionType,
  isModal,
  initialValues,
}) => {
  const { t } = useTranslation();

  useEffect(() => {
    if (initialValues) {
      setTransactionType(initialValues.transactionType);
    }
  }, [initialValues]);

  return (
    <Row>
      <p className="mb-1 fs-4 text-center fw-bold">
        {t('Select operation type')}:
      </p>
      <Col xs="12" lg={isModal ? '12' : '4'} className="mx-auto d-flex">
        <div className="w-50 text-center">
          <Button
            className="w-100"
            variant={
              transactionType === 'expense' ? 'danger' : 'outline-danger'
            }
            onClick={() => setTransactionType('expense')}>
            {t('expense')}
          </Button>
        </div>
        <div className="w-50 text-center mx-2">
          <Button
            className="w-100"
            variant={
              transactionType === 'profit' ? 'success' : 'outline-success'
            }
            onClick={() => setTransactionType('profit')}>
            {t('profit')}
          </Button>
        </div>

        <div className="w-50 text-center">
          <Button
            className="w-100"
            variant={
              transactionType === 'exchange' ? 'primary' : 'outline-primary'
            }
            onClick={() => setTransactionType('exchange')}>
            {t('exchange')}
          </Button>
        </div>
      </Col>
    </Row>
  );
};

SelectTransactionType.defaultProps = {
  isModal: false,
};

export default SelectTransactionType;
