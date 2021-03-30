import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { AuthContext } from './context/auth';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header/index.jsx';
import Home from './pages/Main';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoute from './components/PrivateRoute';
import './styles/main.scss';
import { setToken } from './api/httpClient';
import { api } from './api/index';
import store from './store';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:3500/graphql',
  cache: new InMemoryCache(),
});

function App() {
  const existingTokens = JSON.parse(localStorage.getItem('tokens'));
  const [authTokens, setAuthTokens] = useState(existingTokens);
  const [isLoggedIn, setLoggedIn] = useState(false);

  const retrieveUserData = async () => {
    try {
      const data = await api.users.getCurrent();
      setUserData(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  if (authTokens && !isLoggedIn) {
    setToken(authTokens, 'User');
    setLoggedIn(true);
  }

  const [userData, setUserData] = useState();

  const setTokens = (data) => {
    localStorage.setItem('tokens', JSON.stringify(data.token));
    setToken(data.token, `${data.user.username} ${data.user.name}`);
    setUserData(data.user);
    setAuthTokens(data.token);
  };

  useEffect(() => {
    if (isLoggedIn && !userData) {
      retrieveUserData();
    }
  }, [isLoggedIn, userData]);

  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <AuthContext.Provider
          value={{
            authTokens,
            setAuthTokens: setTokens,
            user: userData,
            isLoggedIn,
            setLoggedIn,
            resetTokens: setAuthTokens,
            setUserData,
          }}
        >
          <Header />
          <Router>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <PrivateRoute exact path="/" component={Home} />
          </Router>
        </AuthContext.Provider>
      </Provider>
    </ApolloProvider>
  );
}

export default App;
