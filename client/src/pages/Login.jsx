import React, { useState } from 'react';
import LoginForm from '../components/Forms/LoginForm/';
import { authRequests } from '../api/index';
import { Redirect } from 'react-router-dom';
import { useAuth } from '../context/auth';
import styles from './auth.module.scss';

function Login() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const { setAuthTokens } = useAuth();

  const postLogin = async (body) => {
    try {
      debugger;
      const result = await authRequests.auth.login(body);
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
    return <Redirect to={'/'} />;
  }
  return (
    <div className={styles.container}>
      <LoginForm submit={postLogin} />
    </div>
  );
}

export default Login;
