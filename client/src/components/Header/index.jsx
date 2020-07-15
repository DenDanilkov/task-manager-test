import React, { useState } from 'react';
import classnames from 'classnames';
import styles from './styles.module.scss';
import { useAuth } from '../../context/auth';
import { api } from '../../api/index';

const AppHeader = () => {
  const { user, isLoggedIn, setLoggedIn, resetTokens, setUserData } = useAuth();
  const [isChangeAvatarMode, setChangeAvatarMode] = useState(false);
  const logout = () => {
    localStorage.clear();
    resetTokens();
    setLoggedIn(false);
  };
  const onFileAddition = (e) => {
    const data = new FormData();
    const file = e.target.files[0];
    data.append('image', file);
    avatarUploadRequest(data);
    setChangeAvatarMode(false);
  };

  const avatarUploadRequest = async (data) => {
    const { data: user } = await api.users.addAvatar(data);
    setUserData(user);
  };
  return (
    <header
      className={classnames(styles.header, {
        [styles['change-mode']]: isChangeAvatarMode,
      })}
    >
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
          {isChangeAvatarMode && (
            <button onClick={() => setChangeAvatarMode(false)} className={styles.exit}>
              Exit Avatar mode
            </button>
          )}
        </div>
      )}
    </header>
  );
};

export default AppHeader;
