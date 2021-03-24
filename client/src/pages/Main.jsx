import React, { useEffect } from 'react';
import styles from './main.module.scss';
import AddTaskform from '../components/Forms/AddTaskForm';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasksRequest } from '../features/tasks';
import Task from '../components/Task';
import { Container, Grid, Toolbar } from '@material-ui/core';

function Home(props) {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => {
    return state.tasks.tasks;
  });
  useEffect(() => {
    dispatch(fetchTasksRequest());
  }, [dispatch]);
  return (
    <Container className={styles.container} maxWidth="false">
      <Toolbar />
      <Grid justify="space-between" container alignContent="center" className={styles.main}>
        <div className={styles.tasks}>
          {!tasks.length ? (
            <span className={styles['no-data']}>You haven't created any task yet!</span>
          ) : (
            tasks.map((item) => {
              return (
                <Task
                  id={item._id}
                  title={item.title}
                  description={item.description}
                  date={item.createdAt}
                  status={item.statusId.title}
                  idStatus={item.statusId._id}
                  key={item._id}
                />
              );
            })
          )}
        </div>
        <AddTaskform />
      </Grid>
    </Container>
  );
}

export default Home;
