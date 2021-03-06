import React, { useState, useEffect, useRef } from 'react';
import classnames from 'classnames';
import styles from './styles.module.scss';
import { useDispatch } from 'react-redux';
import {
  deleteTaskRequest,
  changeTaskStatusRequest,
  changeTaskRequest,
} from '../../features/tasks';
import { dateFormater } from '../../utils/dateFormatter';

const Task = ({ id, title, description, date, status, idStatus }) => {
  const dispatch = useDispatch();
  const [descriptionMode, setDescriptionMode] = useState(false);

  const changeStatusHandler = (e) => {
    dispatch(changeTaskStatusRequest({ idStatus, title: e.target.value }));
  };
  const onBlurHandler = (e) => {
    dispatch(changeTaskRequest({ idTask: id, description: e.target.value }));
    setDescriptionMode(false);
  };

  const ref = useRef();

  useEffect(() => {
    if (descriptionMode) ref.current.focus();
  }, [descriptionMode]);

  return (
    <div
      className={classnames(styles.container, {
        [styles['description-mode']]: descriptionMode,
      })}
    >
      <div className={styles.head}>
        <div className={styles.title}>{title}</div>
        <select onChange={changeStatusHandler} className={styles.status} defaultValue={status}>
          <option value="not started">not started</option>
          <option value="completed">completed</option>
          <option value="in progress">in progress</option>
        </select>
      </div>
      {!descriptionMode && (
        <div
          onClick={() => setDescriptionMode(true)}
          className={classnames(styles.description, {
            [styles['description-mode']]: !descriptionMode,
          })}
        >
          {description}
        </div>
      )}
      {descriptionMode && (
        <textarea
          ref={ref}
          onBlur={onBlurHandler}
          className={styles.description}
          defaultValue={description}
        ></textarea>
      )}

      <div className={styles['info-control']}>
        <div className={styles.time}>{dateFormater(date)}</div>
        <button onClick={() => dispatch(deleteTaskRequest(id))} className={styles.delete}>
          Delete Task
        </button>
      </div>
    </div>
  );
};

export default Task;
