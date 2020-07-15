import React from 'react';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';

const RegisterForm = ({ submit }) => {
  const formik = useFormik({
    initialValues: {
      name: '',
      surname: '',
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
      <div className={styles.title}>Register</div>
      <div className={styles['group']}>
        <label className={styles['name-label']} htmlFor="name">
          Name
        </label>
        <input
          className={styles['name-field']}
          type="text"
          name="name"
          id="name"
          {...formik.getFieldProps('name')}
        />
      </div>
      <div className={styles['group']}>
        <label className={styles['surname-label']} htmlFor="surname">
          Surname
        </label>
        <input
          className={styles['surname-field']}
          type="text"
          name="surname"
          id="surname"
          {...formik.getFieldProps('surname')}
        />
      </div>
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
      <button className={styles.confirm}>Register</button>
      <Link style={{ ['text-decoration']: 'none', color: 'white' }} to={`/login`}>
        Already registered?
      </Link>
    </form>
  );
};

export default RegisterForm;
