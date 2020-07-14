import React, { useState } from 'react';
import RegisterForm from '../components/Forms/RegisterForm';
import { authRequests } from '../api/index';
import { Redirect } from 'react-router-dom';
import { useAuth } from '../context/auth';
import styles from './auth.module.scss';

function Register() {
  const [isError, setIsError] = useState(false);
  const { setAuthTokens, isLoggedIn, setLoggedIn } = useAuth();

  const postLogin = async (body) => {
    try {
      const result = await authRequests.auth.register(body);
      if (result.status === 200) {
        setAuthTokens(result.data);
        setLoggedIn(true);
      } else {
        setIsError(true);
      }
    } catch (error) {
      setIsError(true);
    }
  };

  if (isLoggedIn) {
    return <Redirect to={{ pathname: '/' }} />;
  }

  return (
    <div className={styles.container}>
      <RegisterForm submit={postLogin} />
    </div>
  );
}

export default Register;
