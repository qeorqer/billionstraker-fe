import React, { Dispatch, SetStateAction } from 'react';

export const handleChangeAmount =
  (setAmount: Dispatch<SetStateAction<string | number>>) =>
  (event: React.ChangeEvent<HTMLInputElement>) => {
    const validateSumReg = /^(0|[1-9]\d*)(\.\d+)?$/;

    if (validateSumReg.test(event.target.value) || event.target.value === '') {
      setAmount(event.target.value);
    }
  };
