export default (httpAuth) => {
  return {
    login: (body) => {
      return httpAuth.post('login', body);
    },
    register: (body) => {
      return httpAuth.post('register', body);
    },
  };
};
