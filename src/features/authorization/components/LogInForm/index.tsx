import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextInput, PasswordInput, Button, Stack } from '@mantine/core';

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

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: ({ login, password }) => {
      dispatch(logInThunk({ login: login.trim().toLowerCase(), password }));
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack w={300} mx="auto">
        <TextInput
          size="md"
          name="login"
          type="email"
          placeholder={t('login')}
          value={formik.values.login}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.login && formik.errors.login ? t(formik.errors.login) : null}
        />

        <PasswordInput
          size="md"
          name="password"
          placeholder={t('password')}
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && formik.errors.password ? t(formik.errors.password) : null}
          visible={isPasswordShown}
          onVisibilityChange={setIsPasswordShown}
        />

        <Button
          type="submit"
          color="primary"
          disabled={formik.isSubmitting || !formik.isValid}
        >
          {t('Sign in')}
        </Button>
      </Stack>
    </form>
  );
};

export default LoginForm;
