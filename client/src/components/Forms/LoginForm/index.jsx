import React from 'react';
import { Formik, useFormik } from 'formik';
import styles from './styles.module.scss';
import { Link } from 'react-router-dom';
import {
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import * as Yup from 'yup';

const useStyles = makeStyles((theme) => ({
  title: {
    padding: '0 0 0 30px',
  },
  input: {
    margin: '10px 0',
  },
  button: {
    margin: '30px 0 0 0',
    width: '30%',
    alignSelf: 'center',
  },
  link: {
    color: 'black',
    marginTop: '20px',
    alignSelf: 'flex-end',
  },
}));

const RenderedLoginForm = (props) => {
  const {
    values: { email, password },
    errors,
    touched,
    handleSubmit,
    handleChange,
    isValid,
    setFieldTouched,
  } = props;

  const styles = useStyles();

  const change = (name, e) => {
    e.persist();
    handleChange(e);
    setFieldTouched(name, true, false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography align="center" variant="h6">
        Login
      </Typography>
      <FormControl>
        <InputLabel htmlFor="email">Email</InputLabel>
        <Input
          id="email"
          aria-describedby="email"
          value={email}
          onChange={change.bind(null, 'email')}
          className={styles.input}
        />
        <FormHelperText error={touched.email && errors.email} id="email">
          {touched.email && errors.email}
        </FormHelperText>
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="password">Password</InputLabel>
        <Input
          id="password"
          aria-describedby="password"
          value={password}
          onChange={change.bind(null, 'password')}
          color="primary"
          className={styles.input}
        />
        <FormHelperText id="password" error={touched.password && errors.password}>
          {touched.password && errors.password}
        </FormHelperText>
      </FormControl>
      <Button
        variant="contained"
        color="primary"
        type="submit"
        disabled={!isValid}
        className={styles.button}
      >
        Login
      </Button>
    </form>
  );
};

const LoginForm = ({ submit }) => {
  const validationSchema = Yup.object({
    email: Yup.string('Enter your email')
      .required('Email is required')
      .email('Enter a valid email'),
    password: Yup.string('').required('Enter your password'),
  });

  const initialValues = {
    email: '',
    password: '',
  };

  return (
    <Paper className={styles.container} elevation={1}>
      <Formik
        render={(props) => <RenderedLoginForm {...props} />}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          submit(values);
          actions.resetForm();
        }}
      />
      <Link style={{ 'text-decoration': 'none' }} to={`/register`} className={styles.link}>
        Not registered?
      </Link>
    </Paper>
  );
};

export default LoginForm;
