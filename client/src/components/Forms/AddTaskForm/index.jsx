import React from 'react';
import { useFormik } from 'formik';
import styles from './styles.module.scss';
import { useDispatch } from 'react-redux';
import { createTaskRequest } from '../../../features/tasks';

const AddTaskform = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
    },
    onSubmit: (values) => {
      dispatch(createTaskRequest(values));
      formik.resetForm();
    },
  });
  return (
    <form className={styles.form} onSubmit={formik.handleSubmit}>
      <div className={styles.title}>Add your task</div>
      <div className={styles['group']}>
        <label className={styles['title-label']} htmlFor="title">
          Task title
        </label>
        <input
          className={styles['title-field']}
          type="text"
          name="title"
          id="title"
          {...formik.getFieldProps('title')}
        />
      </div>
      <div className={styles['group']}>
        <label className={styles['description-label']} htmlFor="description">
          Task description
        </label>
        <textarea
          className={styles['description-field']}
          type="text"
          name="description"
          id="description"
          {...formik.getFieldProps('description')}
        />
      </div>
      <button className={styles.confirm}>Create Task</button>
    </form>
  );
};

export default AddTaskform;
