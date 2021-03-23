import React from 'react';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';
import {
  Button,
  FilledInput,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  makeStyles,
  OutlinedInput,
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

const RenderedRegisterForm = (props) => {
  const {
    values: { name, email, password, surname },
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
        Register
      </Typography>
      <FormControl>
        <InputLabel htmlFor="name">Name</InputLabel>
        <Input
          id="name"
          aria-describedby="name"
          value={name}
          onChange={change.bind(null, 'name')}
          className={styles.input}
        />
        <FormHelperText error={touched.name && errors.name} id="name">
          {touched.name && errors.name}
        </FormHelperText>
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="surname">Surname</InputLabel>
        <Input
          id="surname"
          aria-describedby="surname"
          value={surname}
          onChange={change.bind(null, 'surname')}
          className={styles.input}
        />
        <FormHelperText id="surname" error={touched.surname && errors.surname}>
          {touched.surname && errors.surname}
        </FormHelperText>
      </FormControl>
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
        Register
      </Button>
    </form>
  );
};

const RegisterForm = ({ submit }) => {
  const validationSchema = Yup.object({
    name: Yup.string('Enter a name').required('Name is required'),
    surname: Yup.string('Enter a surname').required('Surname is required'),
    email: Yup.string('Enter your email')
      .email('Enter a valid email')
      .required('Email is required'),
    password: Yup.string('')
      .min(8, 'Password must contain at least 8 characters')
      .required('Enter your password'),
  });

  const initialValues = {
    name: '',
    surname: '',
    email: '',
    password: '',
  };
  return (
    <Paper className={styles.container} elevation={1}>
      <Formik
        render={(props) => <RenderedRegisterForm {...props} />}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          submit(values);
          actions.resetForm();
        }}
      />
      <Link style={{ 'text-decoration': 'none' }} to={`/login`} className={styles.link}>
        Already registered?
      </Link>
    </Paper>
  );
};

export default RegisterForm;
