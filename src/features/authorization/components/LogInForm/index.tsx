import React, { useState } from 'react';
import { Field, FieldProps, Form, Formik, FormikProps } from 'formik';
import * as Yup from 'yup';
import { Button, FormControl, FormGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { AuthData } from 'features/user/types';
import { logInThunk } from 'features/user';
import { useAppDispatch } from 'store/hooks';

const initialValues: AuthData = {
  login: '',
  password: '',
};

const validationSchema = Yup.object().shape({
  login: Yup.string().email('Email is invalid').required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must contain at least 6 symbols'),
});

const LoginForm = () => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const handleSignIn = ({ login, password }: AuthData) =>
    dispatch(logInThunk({ login: login.trim().toLowerCase(), password }));

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSignIn}
      render={({
        errors,
        touched,
        handleSubmit,
        isSubmitting,
      }: FormikProps<AuthData>) => (
        <Form onSubmit={handleSubmit}>
          <Field name="login">
            {({ field }: FieldProps) => (
              <FormGroup className="authFormGroup mb-4">
                <FormControl
                  {...field}
                  type="email"
                  placeholder={t('login')}
                  isInvalid={Boolean(touched.login && errors.login)}
                />
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
              <FormGroup controlId="password" className="authFormGroup mb-4 ">
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

          <Button
            type="submit"
            variant="warning"
            disabled={
              isSubmitting ||
              Boolean(
                (errors.login && touched.login) ||
                  (errors.password && touched.password),
              )
            }>
            {t('Sign in')}
          </Button>
        </Form>
      )}
    />
  );
};

export default LoginForm;
