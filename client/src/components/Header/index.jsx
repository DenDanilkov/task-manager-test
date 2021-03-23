import React, { useState } from 'react';
import classnames from 'classnames';
import styles from './styles.module.scss';
import { useAuth } from '../../context/auth';
import { api } from '../../api/index';
import { AppBar, Button, IconButton, Menu, Toolbar, Typography } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import MenuItem from 'antd/es/menu/MenuItem';

class MenuIcon extends React.Component {
  render() {
    return null;
  }
}

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

  const [anchorEl, setAnchorEl] = useState(null);
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const isMenuOpen = Boolean(anchorEl);

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id="primary-search-account-menu"
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
    </Menu>
  );

  return (
    // <AppBar position="static">
    //   <Toolbar>
    //     <Typography variant="h6" edge="start">
    //       Task-Manager
    //     </Typography>
    //     {!isLoggedIn && (
    //       <Typography variant="h6" edge="end">
    //         Please authorize
    //       </Typography>
    //     )}
    //     {isLoggedIn && (
    //       <IconButton
    //         edge="end"
    //         aria-label="account of current user"
    //         aria-controls="primary-search-account-menu"
    //         aria-haspopup="true"
    //         onClick={handleProfileMenuOpen}
    //         color="inherit"
    //       >
    //         <AccountCircle />
    //       </IconButton>
    //     )}
    //     {renderMenu}
    //   </Toolbar>
    // </AppBar>
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
