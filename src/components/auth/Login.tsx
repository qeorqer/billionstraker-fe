import React from 'react'
import { Field, FieldProps, Form, Formik, FormikProps } from 'formik'
import * as Yup from 'yup'
import { authData } from '../../types/user.type'
import { Button, FormControl, FormGroup } from 'react-bootstrap'
import { logIn } from '../../store/reducers/user.reducer'
import { connect } from "react-redux";
import { AppDispatch } from "../../store";
import { useTranslation } from "react-i18next";

const LogInFormMarkup: React.FC<FormikProps<authData>> = (
  {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
  }) => {
  const {t} = useTranslation()

  return(
    <Form onSubmit={handleSubmit}>
      <Field
        name='login'
        render={({ field }: FieldProps) => (
          <FormGroup
            controlId="login"
            className='authFormGroup mb-4'>
            <FormControl
              type={'text'}
              value={field.value}
              onChange={field.onChange}
              placeholder={t('login')}
              isValid={false}
            />
            {
              touched.login &&
              errors.login &&
              <FormControl.Feedback
                type="invalid" tooltip
              >
                {errors.login}
              </FormControl.Feedback>
            }
          </FormGroup>
        )}
      />


      <Field
        type='password'
        name='password'
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.password}
        render={({ field }: FieldProps) => (
          <FormGroup controlId="password" className='authFormGroup mb-4'>
            <FormControl
              type={'password'}
              value={field.value}
              onChange={field.onChange}
              placeholder={t('password')}
            />
            {
              touched.password &&
              errors.password &&
              <FormControl.Feedback
                type="invalid" tooltip
              >
                {errors.password}
              </FormControl.Feedback>
            }
          </FormGroup>
        )}
      />

      <Button
        type='submit'
        variant='warning'
        disabled={
          isSubmitting ||
          Boolean(errors.login && touched.login) ||
          Boolean(errors.password && touched.password)
        }
      >
        {t('Sign in')}
      </Button>
    </Form>
  )
}

const init: authData = {
  login: '',
  password: ''
}

type propsType = {
  dispatch: AppDispatch
}

const LoginForm = (props: propsType) => (
  <Formik
    initialValues={init}
    validationSchema={
      Yup.object().shape({
        login: Yup.string()
          .email('Email not valid')
          .required('Email is required'),
        password: Yup.string()
          .required('Password is required')
          .min(6, 'Password must contain at least 6 symbols')
      })
    }
    onSubmit={(values: authData) => props.dispatch(logIn({ login: values.login.toLowerCase(), password: values.password }))}
    render={(props: FormikProps<authData>) => <LogInFormMarkup {...props} />}
  />
)

export default connect()(LoginForm)