import React from 'react';
import styles from './main.module.scss';
import AddTaskform from '../components/Forms/AddTaskForm';
import Task from '../components/Task';
import { Container, Grid, Toolbar } from '@material-ui/core';
import { GET_ALL_TASKS } from './queries';
import { useQuery } from '@apollo/client';

function Home(props) {
  const { data, loading } = useQuery(GET_ALL_TASKS, {
    fetchPolicy: 'network-only',
  });

  console.log(data);

  return (
    <Container className={styles.container} maxWidth="false">
      <Toolbar />
      <Grid justify="space-around" container alignItems="center" className={styles.main}>
        <div className={styles.tasks}>
          {!data?.getAllTasks.length ? (
            <span className={styles['no-data']}>You haven't created any task yet!</span>
          ) : (
            data?.getAllTasks.map((item) => {
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
