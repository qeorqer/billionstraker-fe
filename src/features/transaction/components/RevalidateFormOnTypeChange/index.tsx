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
  const { setTouched, setFieldValue } = useFormikContext<TransactionFormData>();

  useEffect(() => {
    if (!transaction || transaction.transactionType !== selectedType) {
      setTouched({}, true);
      setFieldValue('categoryId', '');
    }
  }, [selectedType]);
  return null;
};

export default RevalidateFormOnTypeChange;
