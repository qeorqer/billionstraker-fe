import {
  Transaction,
  TransactionFormData,
  TransactionType,
} from 'features/transaction/types';
import { useFormikContext } from 'formik';
import { FC, useEffect } from 'react';

type RevalidateFormOnTypeChangeProps = {
  selectedType: TransactionType;
  transaction: Transaction | null;
};

const RevalidateFormOnTypeChange: FC<RevalidateFormOnTypeChangeProps> = ({
  selectedType,
  transaction,
}) => {
  const { setFieldValue } = useFormikContext<TransactionFormData>();

  useEffect(() => {
    if (!transaction || transaction.transactionType !== selectedType) {
      if (selectedType === 'exchange') {
        setFieldValue('categoryId', null, false);
      } else {
        setFieldValue('balanceId2', null, false);
        setFieldValue('sum2', '', false);
      }
      setFieldValue('sum', '', false);
    }
  }, [selectedType]);

  return null;
};

export default RevalidateFormOnTypeChange;
