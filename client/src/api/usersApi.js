export default (http) => {
  return {
    getCurrent: () => {
      return http.get(`users/current`);
    },
  };
};
