import React from 'react';
import styles from './styles.module.scss';
import { useAuth } from '../../context/auth';

const AppHeader = () => {
  const { user, isLoggedIn, setLoggedIn, setAuthTokens } = useAuth();
  const logout = () => {
    setAuthTokens();
    setLoggedIn(false);
  };
  return (
    <header className={styles.header}>
      <div>Tasks-Manager test</div>
      {isLoggedIn && <div className={styles.logout}>Logout</div>}
      {!isLoggedIn && <div className={styles.logout}>Please authorize</div>}
      {user && (
        <div className={styles.user}>
          <div>{`Hello ${user.name} ${user.surname}`}</div>
          <div
            className={styles.image}
            style={{
              width: `50px`,
              height: `50px`,
              backgroundImage: `url(http://localhost:3500/${user.avatar}`,
            }}
          ></div>
        </div>
      )}
    </header>
  );
};

export default AppHeader;
