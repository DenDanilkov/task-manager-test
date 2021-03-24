import React, { useState } from 'react';
import styles from './styles.module.scss';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import { useDispatch } from 'react-redux';
import {
  deleteTaskRequest,
  changeTaskStatusRequest,
  changeTaskRequest,
} from '../../features/tasks';
import { dateFormater } from '../../utils/dateFormatter';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Tooltip,
  Typography,
} from '@material-ui/core';

const Task = ({ id, title, description, date, status, idStatus }) => {
  const dispatch = useDispatch();
  const [descriptionMode, setDescriptionMode] = useState(false);
  const [descriptionField, setDescriptionField] = useState('');

  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeStatusHandler = (value) => {
    dispatch(changeTaskStatusRequest({ idStatus, title: value }));
    handleClose();
  };
  const changeDescriptionHandler = () => {
    dispatch(changeTaskRequest({ idTask: id, description: descriptionField }));
    setDescriptionMode(false);
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleEditMode = (event) => {
    setDescriptionMode(!descriptionMode);
  };

  const closeEditMode = () => {
    setDescriptionMode(false);
  };

  const handleRemoveTasks = (event) => {
    dispatch(deleteTaskRequest(id));
  };

  return (
    // <div
    //   className={classnames(styles.container, {
    //     [styles['description-mode']]: descriptionMode,
    //   })}
    // >
    //   <div className={styles.head}>
    //     <div className={styles.title}>{title}</div>
    //     <select onChange={changeStatusHandler} className={styles.status} defaultValue={status}>
    //       <option value="not started">not started</option>
    //       <option value="completed">completed</option>
    //       <option value="in progress">in progress</option>
    //     </select>
    //   </div>
    //   {!descriptionMode && (
    //     <div
    //       onClick={() => setDescriptionMode(true)}
    //       className={classnames(styles.description, {
    //         [styles['description-mode']]: !descriptionMode,
    //       })}
    //     >
    //       {description}
    //     </div>
    //   )}
    //   {descriptionMode && (
    //     <textarea
    //       ref={ref}
    //       onBlur={onBlurHandler}
    //       className={styles.description}
    //       defaultValue={description}
    //     ></textarea>
    //   )}
    //
    //   <div className={styles['info-control']}>
    //     <div className={styles.time}>{dateFormater(date)}</div>
    //     <button onClick={() => dispatch(deleteTaskRequest(id))} className={styles.delete}>
    //       Delete Task
    //     </button>
    //   </div>
    // </div>
    <Card className={styles.container}>
      <CardHeader
        title={title}
        subheader={dateFormater(date)}
        action={
          <Button
            aria-controls="simple-menu"
            aria-haspopup="true"
            variant="outlined"
            onClick={handleClick}
          >
            {status}
          </Button>
        }
      />
      <CardContent>
        {!descriptionMode && (
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        )}
        {descriptionMode && (
          <TextField
            id="outlined-multiline-static"
            label="Task description"
            multiline
            rows={4}
            defaultValue={description}
            variant="outlined"
            fullWidth
            onChange={(e) => {
              setDescriptionField(e.target.value);
            }}
          />
        )}
      </CardContent>
      <CardActions disableSpacing>
        {!descriptionMode && (
          <>
            <Tooltip title="Delete" enterDelay={500} leaveDelay={200}>
              <IconButton aria-label="remove task" onClick={handleRemoveTasks}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Edit description" enterDelay={500} leaveDelay={200}>
              <IconButton aria-label="edit" onClick={handleEditMode}>
                <EditIcon />
              </IconButton>
            </Tooltip>
          </>
        )}
        {descriptionMode && (
          <>
            <Tooltip title="Cancel Edit" enterDelay={500} leaveDelay={200}>
              <IconButton aria-label="cancel edit" onClick={closeEditMode}>
                <CloseIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Save edit" enterDelay={500} leaveDelay={200}>
              <IconButton aria-label="save edit" onClick={changeDescriptionHandler}>
                <SaveIcon />
              </IconButton>
            </Tooltip>
          </>
        )}
      </CardActions>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => changeStatusHandler('completed')}>Completed</MenuItem>
        <MenuItem onClick={() => changeStatusHandler('in progress')}>In progress</MenuItem>
        <MenuItem onClick={() => changeStatusHandler('not started')}>Not started</MenuItem>
      </Menu>
    </Card>
  );
};

export default Task;
