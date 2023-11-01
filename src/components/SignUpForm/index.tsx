import React, { useState } from 'react';
import { Field, FieldProps, Form, Formik, FormikProps } from 'formik';
import * as Yup from 'yup';
import { Button, FormControl, FormGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { AppDispatch } from 'store';
import { signUpThunk } from 'features/user';

type signupForm = {
  login: string;
  password: string;
  confirmPassword: string;
};

const SignUpFormMarkup: React.FC<FormikProps<signupForm>> = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
}) => {
  const { t } = useTranslation();
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  return (
    <Form onSubmit={handleSubmit}>
      <Field
        name="login"
        render={({ field }: FieldProps) => (
          <FormGroup controlId="login" className="authFormGroup mb-4">
            <FormControl
              type="email"
              value={field.value}
              onChange={field.onChange}
              placeholder={t('login')}
              isValid={false}
            />
            {touched.login && errors.login && (
              <FormControl.Feedback type="invalid" tooltip>
                {errors.login}
              </FormControl.Feedback>
            )}
          </FormGroup>
        )}
      />

      <Field
        type="password"
        name="password"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.password}
        render={({ field }: FieldProps) => (
          <FormGroup controlId="password" className="authFormGroup mb-4">
            <FormControl
              type={isPasswordShown ? 'text' : 'password'}
              value={field.value}
              onChange={field.onChange}
              placeholder={t('password')}
            />
            <span onClick={() => setIsPasswordShown(!isPasswordShown)}>
              {t(isPasswordShown ? 'hide' : 'show')}
            </span>
            {touched.password && errors.password && (
              <FormControl.Feedback type="invalid" tooltip>
                {errors.password}
              </FormControl.Feedback>
            )}
          </FormGroup>
        )}
      />

      <Field
        type="password"
        name="confirmPassword"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.confirmPassword}
        render={({ field }: FieldProps) => (
          <FormGroup controlId="confirmPassword" className="authFormGroup mb-4">
            <FormControl
              type={isPasswordShown ? 'text' : 'password'}
              value={field.value}
              onChange={field.onChange}
              placeholder={t('Confirm password')}
            />
            <span onClick={() => setIsPasswordShown(!isPasswordShown)}>
              {t(isPasswordShown ? 'hide' : 'show')}
            </span>
            {touched.confirmPassword && errors.confirmPassword && (
              <FormControl.Feedback type="invalid" tooltip>
                {errors.confirmPassword}
              </FormControl.Feedback>
            )}
          </FormGroup>
        )}
      />

      <Button
        type="submit"
        variant="warning"
        disabled={
          isSubmitting ||
          Boolean(errors.login && touched.login) ||
          Boolean(errors.password && touched.password)
        }>
        {t('Sign up')}
      </Button>
    </Form>
  );
};

const init: signupForm = {
  login: '',
  password: '',
  confirmPassword: '',
};

type propsType = {
  dispatch: AppDispatch;
};

const SignUpForm = (props: propsType) => (
  <Formik
    initialValues={init}
    validationSchema={Yup.object().shape({
      login: Yup.string()
        .email('Email not valid')
        .required('Email is required'),
      password: Yup.string()
        .required('Password is required')
        .min(6, 'Password must contain at least 6 symbols'),
      confirmPassword: Yup.string()
        .required('Confirm your password')
        .oneOf([Yup.ref('password')], 'Password does not match'),
    })}
    onSubmit={(values: signupForm) =>
      props.dispatch(
        signUpThunk({
          login: values.login.trim().toLowerCase(),
          password: values.password,
        }),
      )
    }
    render={(props: FormikProps<signupForm>) => <SignUpFormMarkup {...props} />}
  />
);

export default connect()(SignUpForm);
