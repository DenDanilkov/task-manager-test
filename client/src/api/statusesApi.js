export default (http) => {
  return {
    update: (body) => {
      return http.put('statuses', body);
    },
  };
};
