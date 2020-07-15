export default (http) => {
  return {
    getCurrent: () => {
      return http.get(`users/current`);
    },
    addAvatar: (body) => {
      return http.post(`users/avatar`, body);
    },
  };
};
