import React, { useState } from 'react';
import { Field, FieldProps, Form, Formik, FormikProps } from 'formik';
import * as Yup from 'yup';
import { Button, FormControl, FormGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { signUpThunk } from 'features/user';
import { useAppDispatch } from 'store/hooks';

type SignupFields = {
  login: string;
  password: string;
  confirmPassword: string;
};

const initialValues: SignupFields = {
  login: '',
  password: '',
  confirmPassword: '',
};

const validationSchema = Yup.object().shape({
  login: Yup.string().email('Email is invalid').required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must contain at least 6 symbols'),
  confirmPassword: Yup.string()
    .required('Confirm your password')
    .oneOf([Yup.ref('password')], 'Passwords do not match'),
});

const SignUpForm = () => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const handleSignUp = ({ login, password }: SignupFields) =>
    dispatch(
      signUpThunk({
        login: login.trim().toLowerCase(),
        password,
      }),
    );

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSignUp}
      render={({
        errors,
        touched,
        handleSubmit,
        isSubmitting,
      }: FormikProps<SignupFields>) => (
        <Form onSubmit={handleSubmit}>
          <Field name="login">
            {({ field }: FieldProps) => (
              <FormGroup className="authFormGroup mb-4">
                <FormControl {...field} type="email" placeholder={t('login')} />
                {touched.login && errors.login && (
                  <FormControl.Feedback type="invalid" tooltip>
                    {t(errors.login)}
                  </FormControl.Feedback>
                )}
              </FormGroup>
            )}
          </Field>

          <Field name="password">
            {({ field }: FieldProps) => (
              <FormGroup controlId="password" className="authFormGroup mb-4">
                <FormControl
                  {...field}
                  type={isPasswordShown ? 'text' : 'password'}
                  placeholder={t('password')}
                />
                <span onClick={() => setIsPasswordShown(!isPasswordShown)}>
                  {t(isPasswordShown ? 'hide' : 'show')}
                </span>
                {touched.password && errors.password && (
                  <FormControl.Feedback type="invalid" tooltip>
                    {t(errors.password)}
                  </FormControl.Feedback>
                )}
              </FormGroup>
            )}
          </Field>

          <Field name="confirmPassword">
            {({ field }: FieldProps) => (
              <FormGroup
                controlId="confirmPassword"
                className="authFormGroup mb-4">
                <FormControl
                  {...field}
                  type={isPasswordShown ? 'text' : 'password'}
                  placeholder={t('Confirm password')}
                />
                <span onClick={() => setIsPasswordShown(!isPasswordShown)}>
                  {t(isPasswordShown ? 'hide' : 'show')}
                </span>
                {touched.confirmPassword && errors.confirmPassword && (
                  <FormControl.Feedback type="invalid" tooltip>
                    {t(errors.confirmPassword)}
                  </FormControl.Feedback>
                )}
              </FormGroup>
            )}
          </Field>

          <Button
            type="submit"
            variant="warning"
            disabled={
              isSubmitting ||
              Boolean(
                (errors.login && touched.login) ||
                  (errors.password && touched.password) ||
                  (touched.confirmPassword && errors.confirmPassword),
              )
            }>
            {t('Sign up')}
          </Button>
        </Form>
      )}
    />
  );
};

export default SignUpForm;
