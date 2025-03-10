import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextInput, PasswordInput, Button, Stack } from '@mantine/core';

import { signUpThunk } from 'features/user';
import { useAppDispatch } from 'store/hooks';

type SignUpFormFields = {
  login: string;
  password: string;
  confirmPassword: string;
};

const initialValues: SignUpFormFields = {
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

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: ({ login, password }) => {
      dispatch(signUpThunk({ login: login.trim().toLowerCase(), password }));
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack w={300} mx="auto">
        <TextInput
          name="login"
          type="email"
          placeholder={t('login')}
          value={formik.values.login}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.login && formik.errors.login ? t(formik.errors.login) : null}
        />

        <PasswordInput
          name="password"
          placeholder={t('password')}
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && formik.errors.password ? t(formik.errors.password) : null}
          visible={isPasswordShown}
          onVisibilityChange={setIsPasswordShown}
        />

        <PasswordInput
          name="confirmPassword"
          placeholder={t('Confirm password')}
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.confirmPassword && formik.errors.confirmPassword ? t(formik.errors.confirmPassword) : null}
          visible={isPasswordShown}
          onVisibilityChange={setIsPasswordShown}
        />

        <Button
          type="submit"
          variant="filled"
          color="primary"
          disabled={formik.isSubmitting || !formik.isValid}
          h={40}
          fz="md"
          fw={700}
        >
          {t('Sign up')}
        </Button>
      </Stack>
    </form>
  );
};

export default SignUpForm;
