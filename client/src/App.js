import React, { useState } from 'react';
import { AuthContext } from './context/auth';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import Header from './components/Header/index.jsx';
import Home from './pages/Main';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoute from './components/PrivateRoute';
import './styles/main.scss';
import { setToken } from './api/httpClient';

function App() {
  const existingTokens = JSON.parse(localStorage.getItem('tokens'));
  const [authTokens, setAuthTokens] = useState(existingTokens);
  const [userData, setUserData] = useState();

  const setTokens = (data) => {
    localStorage.setItem('tokens', JSON.stringify(data.token));
    setToken(data.token, `${data.user.username} ${data.user.name}`);
    setUserData(data.user);
    setAuthTokens(data.token);
  };

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens, user: userData }}>
      <Header />
      <Router>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <PrivateRoute exact path="/" component={Home} />
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
