export default (http) => {
  return {
    getCurrent: () => {
      return http.get(`users/current`);
    },
    addAvatar: (body) => {
      return http.postImage(`users/avatar`, body);
    },
  };
};
