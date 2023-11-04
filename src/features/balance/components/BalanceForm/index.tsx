import React from 'react';
import { Button, Form, FormControl, FormGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'store/hooks';
import { balanceData } from 'features/balance/store/selector';
import * as Yup from 'yup';
import { Field, FieldProps, Formik, FormikProps } from 'formik';
import { Typeahead } from 'react-bootstrap-typeahead';
import { CurrencyOption, getListOfAllCurrencies } from 'features/currency';

type BalanceFormProps = {
  buttonText: string;
};

type BalanceFormFields = {
  name: string;
  amount: number | '';
  currency: string;
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Balance name is required'),
  amount: Yup.number()
    .positive('Must be a positive value')
    .required('Amount value is required'),
  currency: Yup.string().required('Currency is required'),
});

const initialValues: BalanceFormFields = {
  name: '',
  amount: '',
  currency: '',
};

const BalanceForm: React.FC<BalanceFormProps> = ({ buttonText }) => {
  const { t } = useTranslation();
  const { isLoadingBalances } = useAppSelector(balanceData);

  const onSubmit = (values: BalanceFormFields) => {
    console.log(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      render={({
        errors,
        touched,
        handleSubmit,
        isSubmitting,
        setFieldValue,
      }: FormikProps<BalanceFormFields>) => (
        <Form onSubmit={handleSubmit}>
          <Field name="name">
            {({ field }: FieldProps) => (
              <FormGroup className="mb-4 position-relative">
                <FormControl
                  {...field}
                  placeholder={t('name the balance')}
                  isInvalid={Boolean(touched.name && errors.name)}
                />
                <FormControl.Feedback
                  type="invalid"
                  className="position-absolute">
                  {errors?.name && t(errors.name)}
                </FormControl.Feedback>
              </FormGroup>
            )}
          </Field>

          <Field name="amount">
            {({ field }: FieldProps) => (
              <FormGroup className="mb-4 position-relative">
                <FormControl
                  {...field}
                  type="number"
                  placeholder={t('set amount')}
                  isInvalid={Boolean(touched.amount && errors.amount)}
                />
                <FormControl.Feedback
                  type="invalid"
                  className="position-absolute">
                  {errors?.amount && t(errors.amount)}
                </FormControl.Feedback>
              </FormGroup>
            )}
          </Field>

          <Field name="currency">
            {() => (
              <FormGroup className="mb-4 position-relative">
                <Typeahead
                  id="currency-typeahead"
                  onChange={(selected) =>
                    setFieldValue(
                      'currency',
                      (selected as CurrencyOption[])[0]?.value ?? '',
                    )
                  }
                  options={getListOfAllCurrencies()}
                  placeholder={t('select currency')}
                  isInvalid={Boolean(touched.currency && errors.currency)}
                />
                {touched.currency && errors.currency && (
                  <FormControl.Feedback
                    type="invalid"
                    className="position-absolute">
                    {errors?.currency && t(errors.currency)}
                  </FormControl.Feedback>
                )}
              </FormGroup>
            )}
          </Field>

          <div className="text-center">
            <Button
              type="submit"
              variant="warning"
              className="w300Px text-white"
              disabled={isLoadingBalances}>
              {t(buttonText)}
            </Button>
          </div>
        </Form>
      )}
    />
  );
};

export default BalanceForm;
