export default http => {
  return {
    getAll: () => {
      return http.get('destinations');
    },
    create: body => {
      return http.post('destinations', body);
    },
  };
};
