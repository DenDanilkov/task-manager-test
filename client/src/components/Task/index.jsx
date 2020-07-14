import React from 'react';
import styles from './styles.module.scss';
import { useDispatch } from 'react-redux';
import { deleteTaskRequest, changeTaskStatusRequest } from '../../features/tasks';

const Task = ({ id, title, description, date, status, idStatus }) => {
  const dispatch = useDispatch();
  const changeStatusHandler = (e) => {
    dispatch(changeTaskStatusRequest({ idStatus, title: e.target.value }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <div className={styles.title}>{title}</div>
        <select onChange={changeStatusHandler} className={styles.status} defaultValue={status}>
          <option value="not started">not started</option>
          <option value="completed">completed</option>
          <option value="in progress">in progress</option>
        </select>
      </div>
      <div className={styles.description}>{description}</div>
      <div className={styles['info-control']}>
        <div className={styles.time}>{date}</div>
        <button onClick={() => dispatch(deleteTaskRequest(id))} className={styles.delete}>
          Delete Task
        </button>
      </div>
    </div>
  );
};

export default Task;
