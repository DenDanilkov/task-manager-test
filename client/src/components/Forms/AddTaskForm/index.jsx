import React from 'react';
import { Formik, useFormik } from 'formik';
import styles from './styles.module.scss';
import { useMutation } from '@apollo/client';
import { createTaskRequest } from '../../../features/tasks';
import {
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import * as Yup from 'yup';
import { ADD_TASK } from './mutations';
import { logger } from 'redux-logger/src';
import { GET_ALL_TASKS } from '../../../pages/queries';

const useStyles = makeStyles((theme) => ({
  title: {
    padding: '0 0 0 30px',
  },
  input: {
    margin: '10px 0',
  },
  button: {
    margin: '30px 0 0 0',
    width: '30%',
    alignSelf: 'center',
  },
  link: {
    color: 'black',
    marginTop: '20px',
    alignSelf: 'flex-end',
  },
}));

const RenderedAddTaskForm = (props) => {
  const {
    values: { title, description },
    errors,
    touched,
    handleSubmit,
    handleChange,
    isValid,
    setFieldTouched,
  } = props;

  const styles = useStyles();

  const change = (name, e) => {
    e.persist();
    handleChange(e);
    setFieldTouched(name, true, false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography align="center" variant="h6">
        New task
      </Typography>
      <FormControl>
        <InputLabel htmlFor="title">Task</InputLabel>
        <Input
          id="title"
          aria-describedby="title"
          value={title}
          onChange={change.bind(null, 'title')}
          className={styles.input}
        />
        <FormHelperText error={touched.title && errors.title} id="title">
          {touched.title && errors.title}
        </FormHelperText>
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="description">Description</InputLabel>
        <Input
          id="description"
          aria-describedby="description"
          value={description}
          onChange={change.bind(null, 'description')}
          color="primary"
          className={styles.input}
        />
        <FormHelperText id="password" error={touched.description && errors.description}>
          {touched.description && errors.description}
        </FormHelperText>
      </FormControl>
      <Button
        variant="contained"
        color="primary"
        type="submit"
        disabled={!isValid}
        className={styles.button}
      >
        Add task
      </Button>
    </form>
  );
};

const AddTaskform = () => {
  const [addTask] = useMutation(ADD_TASK);

  const validationSchema = Yup.object({
    title: Yup.string('').required('Task name is required'),
    description: Yup.string('').required('Description is required'),
  });

  const initialValues = {
    title: '',
    description: '',
  };

  return (
    <Paper className={styles.container} elevation={1}>
      <Formik
        render={(props) => <RenderedAddTaskForm {...props} />}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          const { title, description } = values;
          addTask({
            variables: {
              taskData: {
                title,
                description,
              },
            },
            update(cache, { data: { createTask } }) {
              const { getAllTasks } = cache.readQuery({
                query: GET_ALL_TASKS,
              });

              const newTasks = [...getAllTasks, createTask];

              cache.writeQuery({
                query: GET_ALL_TASKS,
                data: {
                  getAllTasks: newTasks,
                },
              });

              console.log(cache);
            },
          }).catch((error) => console.log(error));
          actions.resetForm();
        }}
      />
    </Paper>
  );
};

export default AddTaskform;
