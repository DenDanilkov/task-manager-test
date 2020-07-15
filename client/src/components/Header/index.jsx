import React, { useState } from 'react';
import styles from './styles.module.scss';
import { useAuth } from '../../context/auth';
import { changeAvatarRequest } from '../../features/tasks';
import { useDispatch } from 'react-redux';

const AppHeader = () => {
  const { user, isLoggedIn, setLoggedIn, setAuthTokens, resetTokens } = useAuth();
  const [isChangeAvatarMode, setChangeAvatarMode] = useState(false);
  const dispatch = useDispatch();
  const logout = () => {
    localStorage.clear();
    resetTokens();
    setLoggedIn(false);
  };
  console.log('User', user);
  const onFileAddition = (e) => {
    const data = new FormData();
    const file = e.target.files[0];
    data.append('image', file);
    dispatch(changeAvatarRequest(data));
    setChangeAvatarMode(false);
  };
  return (
    <header className={styles.header}>
      <div>Tasks-Manager test</div>
      {isLoggedIn && (
        <div onClick={logout} className={styles.logout}>
          Logout
        </div>
      )}
      {!isLoggedIn && <div className={styles.logout}>Please authorize</div>}
      {isLoggedIn && user && (
        <div className={styles.user}>
          <div>{`Hello ${user.name} ${user.surname}`}</div>
          {!isChangeAvatarMode && (
            <div
              onClick={() => setChangeAvatarMode(true)}
              className={styles.image}
              style={{
                width: `50px`,
                height: `50px`,
                backgroundImage: `url(http://localhost:3500/avatars/${user.avatar}`,
              }}
            ></div>
          )}
          {isChangeAvatarMode && <input onChange={onFileAddition} name="myAvatar" type="file" />}
        </div>
      )}
    </header>
  );
};

export default AppHeader;
