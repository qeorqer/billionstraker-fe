import React, { Dispatch, SetStateAction } from 'react';
import {
  Button,
  Col,
  Container,
  Form,
  FormControl,
  Row,
} from 'react-bootstrap';
import DatePicker from 'react-datepicker';

import { transactionTypes } from '../../types/transaction.type';
import { balanceType } from '../../types/balance.type';
import { categoryType } from '../../types/category.type';
import Balances from '../../components/shared/Balances';
import 'react-datepicker/dist/react-datepicker.css';

type propsType = {
  t: (text: string) => string;
  transactionType: transactionTypes;
  setTransactionType: Dispatch<SetStateAction<transactionTypes>>;
  setCategoryId: Dispatch<SetStateAction<string>>;
  setBalanceId: Dispatch<SetStateAction<string>>;
  balanceId: string;
  setExchangeBalanceId: Dispatch<SetStateAction<string>>;
  setTitle: Dispatch<SetStateAction<string>>;
  balances: balanceType[];
  categories: categoryType[];
  lang: string;
  title: string;
  sum: string | number;
  exchangeSum: string | number;
  handleChangeSum: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeExchangeSum: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
  date: Date;
  setDate: Dispatch<SetStateAction<Date>>;
};

const CreateTransaction: React.FC<propsType> = ({
  t,
  transactionType,
  setTransactionType,
  setCategoryId,
  setBalanceId,
  balanceId,
  setExchangeBalanceId,
  setTitle,
  balances,
  categories,
  lang,
  title,
  sum,
  exchangeSum,
  handleChangeSum,
  handleChangeExchangeSum,
  handleSubmit,
  date,
  setDate,
}) => (
  <>
    <Container className="py-md-4 my-4">
      <Row>
        <p className="mb-1 fs-4 text-center fw-bold">
          {t('Select operation type')}:
        </p>
        <Col xs="12" lg="4" className="mx-auto d-flex">
          <div className="w-50 text-center">
            <Button
              variant={
                transactionType === 'expense' ? 'danger' : 'outline-danger'
              }
              onClick={() => {
                setTransactionType('expense');
                setCategoryId('');
              }}
            >
              {t('expense')}
            </Button>
          </div>
          <div className="w-50 text-center">
            <Button
              variant={
                transactionType === 'profit' ? 'success' : 'outline-success'
              }
              onClick={() => {
                setTransactionType('profit');
                setCategoryId('');
              }}
            >
              {t('income')}
            </Button>
          </div>

          <div className="w-50 text-center">
            <Button
              variant={
                transactionType === 'exchange' ? 'primary' : 'outline-primary'
              }
              onClick={() => {
                setTransactionType('exchange');
                setCategoryId('');
              }}
            >
              {t('exchange')}
            </Button>
          </div>
        </Col>
      </Row>

      <p className="fs-4 fw-bold text-center my-2">
        {t(
          balances.length ? 'all your balances' : 'your balances will be here',
        )}
      </p>
      <Balances balances={balances} />

      <Row>
        <Col xs="12" lg="7" className="mx-auto  mt-3">
          <Row>
            <Col xs="12" sm="4" className="d-flex flex-wrap">
              <p className="mb-1 fs-5 text-center w-100">
                {t('select balance')}:
              </p>
              <Form.Select
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setBalanceId(e.target.value)
                }
              >
                `
                <option className="d-none" value="">
                  {t('select balance')}
                </option>
                {balances &&
                  balances.map((balance) => (
                    <option key={balance._id} value={balance._id}>
                      {balance.name}
                    </option>
                  ))}
              </Form.Select>
            </Col>
            <Col xs="12" sm="4">
              {transactionType === 'exchange' ? (
                <>
                  <p className="mb-1 fs-5 text-center w-100">
                    {t('select balance')}:
                  </p>
                  <Form.Select
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      setExchangeBalanceId(e.target.value)
                    }
                  >
                    <option className="d-none" value="">
                      {t('select balance')}
                    </option>
                    {balances &&
                      balances.map((balance) => (
                        <option
                          key={balance._id}
                          value={balance._id}
                          disabled={balance._id === balanceId}
                        >
                          {balance.name}
                        </option>
                      ))}
                  </Form.Select>
                </>
              ) : (
                <>
                  <p className="mb-1 fs-5 text-center w-100">
                    {t('Select category')}:
                  </p>
                  <Form.Select
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      setCategoryId(e.target.value)
                    }
                  >
                    <option className="d-none" value="">
                      {t('Select category')}
                    </option>
                    {categories &&
                      categories
                        //.filter((category) => category.isExpense === isExpense)
                        .map((category) => (
                          <option key={category._id} value={category._id}>
                            {category.name}
                          </option>
                        ))}
                  </Form.Select>
                </>
              )}
            </Col>
            <Col xs="12" sm="4" className="d-flex flex-wrap">
              <p className="mb-1 fs-5 text-center w-100">{t('select date')}:</p>
              <DatePicker
                selected={date}
                onChange={(newDate) => setDate(newDate || new Date())}
                className="form-control"
                dateFormat="dd/MM/yyyy"
              />
            </Col>
          </Row>

          <Row className="mt-3">
            <Col xs="6" className="d-flex flex-wrap">
              <p className="mb-1 fs-5">{t('Name the transaction')}:</p>
              <FormControl
                type="text"
                placeholder={t('Transaction title')}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Col>
            <Col
              xs={transactionType === 'exchange' ? 3 : 6}
              className="d-flex flex-wrap"
            >
              <p className="mb-1  fs-5">{t('sum')}:</p>
              <FormControl
                type="number"
                placeholder={t('Transaction sum')}
                value={sum}
                onChange={handleChangeSum}
              />
            </Col>

            {transactionType === 'exchange' && (
              <Col xs="3" className="d-flex flex-wrap">
                <p className="mb-1  fs-5">{t('sum 2')}:</p>
                <FormControl
                  type="number"
                  placeholder={t('Transaction sum')}
                  value={exchangeSum}
                  onChange={handleChangeExchangeSum}
                />
              </Col>
            )}
          </Row>

          <Row>
            <Col xs="12" className="mt-3 text-center">
              <p className="fs-5 mb-1">{t('Submit transaction')}:</p>
              <Button
                variant="warning"
                className="w300Px text-white"
                onClick={handleSubmit}
              >
                {t('Submit')}
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  </>
);

export default CreateTransaction;
