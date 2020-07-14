export default (http) => {
  return {
    getAll: () => {
      return http.get('tasks/particularUser');
    },
    create: (body) => {
      return http.post('tasks', body);
    },
    delete: (id) => {
      return http.delete(`tasks/${id}`);
    },
    update: (body) => {
      return http.put('tasks', body);
    },
  };
};
