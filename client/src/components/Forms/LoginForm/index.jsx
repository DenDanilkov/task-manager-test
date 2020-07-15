import React from 'react';
import { useFormik } from 'formik';
import styles from './styles.module.scss';
import { Link } from 'react-router-dom';

const LoginForm = ({ submit }) => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (values) => {
      submit(values);
      formik.resetForm();
    },
  });
  return (
    <form className={styles.form} onSubmit={formik.handleSubmit}>
      <div className={styles.title}>Login</div>
      <div className={styles['group']}>
        <label className={styles['email-label']} htmlFor="email">
          Email
        </label>
        <input
          className={styles['email-field']}
          type="text"
          name="email"
          id="email"
          {...formik.getFieldProps('email')}
        />
      </div>
      <div className={styles['group']}>
        <label className={styles['password-label']} htmlFor="password">
          Password
        </label>
        <input
          className={styles['password-field']}
          type="text"
          name="password"
          id="password"
          {...formik.getFieldProps('password')}
        />
      </div>
      <button className={styles.confirm}>Login</button>
      <Link style={{ textDecoration: 'none', color: 'white' }} to={`/register`}>
        Not registered?
      </Link>
    </form>
  );
};

export default LoginForm;
