import React, { Dispatch, SetStateAction } from 'react';
import { Button, Form, FormControl } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'store/hooks';
import { balanceData } from 'features/balance/store/selector';

type propsType = {
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  amount: string | number;
  handleChangeAmount: (event: React.ChangeEvent<HTMLInputElement>) => void;
  buttonText: string;
  handleSubmit: () => void;
};

const BalanceForm: React.FC<propsType> = ({
  name,
  setName,
  amount,
  handleChangeAmount,
  buttonText,
  handleSubmit,
}) => {
  const { t } = useTranslation();
  const { isLoadingBalances } = useAppSelector(balanceData);

  return (
    <Form className="text-center">
      <FormControl
        type="text"
        placeholder={t('name the balance')}
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="mb-3"
      />
      <FormControl
        type="number"
        placeholder={t('set amount')}
        value={amount}
        onChange={handleChangeAmount}
        className="mb-3"
      />
      <Button
        variant="warning"
        className="w300Px text-white"
        onClick={handleSubmit}
        disabled={isLoadingBalances}>
        {t(buttonText)}
      </Button>
    </Form>
  );
};

export default BalanceForm;
