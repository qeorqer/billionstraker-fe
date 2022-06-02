import React, { FC } from 'react';
import { Col } from 'react-bootstrap';
import { formattingNumber } from '../../helpers/index.js';
import { useSelector } from 'react-redux';
import { userData } from '../../store/selectors';
import { useTranslation } from 'react-i18next';

const Balance: FC = () => {
  const { user } = useSelector(userData);
  const { t } = useTranslation();

  const total = user.card + user.cash;

  return (
    <Col md="6" xs="12" className="balance">
      <p className="totalBalance fs-3 text-uppercase fw-bold">
        {total ? t('Total balance') : ''}
        <span className="yellowText">
          {' '}
          {total ? formattingNumber(total) : t('There is no money yet')}
        </span>
      </p>
      <p className="fs-5">
        {t('Card balance')}:<span> {formattingNumber(user.card)}</span>
      </p>
      <p className="fs-5">
        {t('In cash')}:<span> {formattingNumber(user.cash)}</span>
      </p>
    </Col>
  );
};

export default Balance;
