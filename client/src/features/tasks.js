import { takeEvery, put, call, delay } from 'redux-saga/effects';
import { createSlice } from '@reduxjs/toolkit';
import { api } from '../api';

export const tasksFeature = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    errors: [],
    loading: false,
  },
  reducers: {
    fetchTasksRequest: (state) => {
      state.loading = true;
    },
    fetchTasksSuccess: (state, { payload }) => {
      state.loading = false;
      state.tasks = payload;
    },
    fetchTasksFailure: (state, { payload }) => {
      state.errors.push(payload);
    },
    createTaskRequest: (state) => {
      state.loading = true;
    },
    createTaskSuccess: (state, { payload }) => {
      state.loading = false;
      state.tasks.push(payload.data);
    },
    createTasksFailure: (state, { payload }) => {
      state.errors.push(payload);
    },
    deleteTaskRequest: (state) => {
      state.loading = true;
    },
    deleteTaskSuccess: (state, { payload }) => {
      state.loading = false;
      state.tasks = state.tasks.filter((item) => item._id !== payload._id);
    },
    deleteTasksFailure: (state, { payload }) => {
      state.errors.push(payload);
    },
    changeTaskStatusRequest: (state) => {
      state.loading = true;
    },
    changeTaskStatusSuccess: (state, { payload }) => {
      state.loading = false;
      state.tasks = state.tasks.map((item) => {
        if (item.statusId._id === payload._id) {
          item.statusId = payload;
          return item;
        }
        return item;
      });
    },

    changeTaskStatusFailure: (state, { payload }) => {
      state.errors.push(payload);
    },
    changeTaskRequest: (state) => {
      state.loading = true;
    },
    changeTaskSuccess: (state, { payload }) => {
      state.loading = false;
      state.tasks = state.tasks.map((item) => {
        if (item._id === payload._id) {
          item = payload;
          return item;
        }
        return item;
      });
    },

    changeTaskFailure: (state, { payload }) => {
      state.errors.push(payload);
    },
  },
});

export const {
  fetchTasksRequest,
  fetchTasksSuccess,
  fetchTasksFailure,
  createTaskRequest,
  createTaskSuccess,
  createTasksFailure,
  deleteTaskRequest,
  deleteTaskSuccess,
  deleteTasksFailure,
  changeTaskStatusRequest,
  changeTaskStatusSuccess,
  changeTaskStatusFailure,
  changeTaskRequest,
  changeTaskSuccess,
  changeTaskFailure,
} = tasksFeature.actions;
export default tasksFeature.reducer;

function* fetchTasksWorker() {
  try {
    const payload = yield call(api.tasks.getAll);
    yield put(fetchTasksSuccess(payload));
  } catch (e) {
    yield put(fetchTasksFailure(e.message));
  }
}
function* createTaskWorker({ payload }) {
  try {
    const response = yield call(api.tasks.create, payload);
    yield put(createTaskSuccess(response));
  } catch (e) {
    yield put(createTasksFailure(e.message));
  }
}
function* deleteTaskWorker({ payload }) {
  try {
    const response = yield call(api.tasks.delete, payload);
    yield put(deleteTaskSuccess(response));
  } catch (e) {
    yield put(deleteTasksFailure(e.message));
  }
}

function* changeTaskStatusWorker({ payload }) {
  try {
    const response = yield call(api.statuses.update, payload);
    yield put(changeTaskStatusSuccess(response));
  } catch (e) {
    yield put(changeTaskStatusFailure(e.message));
  }
}

function* changeTaskWorker({ payload }) {
  try {
    const response = yield call(api.tasks.update, payload);
    yield put(changeTaskSuccess(response));
  } catch (e) {
    yield put(changeTaskFailure(e.message));
  }
}

export function* tasksSaga() {
  yield takeEvery(fetchTasksRequest().type, fetchTasksWorker);
  yield takeEvery(createTaskRequest().type, createTaskWorker);
  yield takeEvery(deleteTaskRequest().type, deleteTaskWorker);
  yield takeEvery(changeTaskRequest().type, changeTaskWorker);
  yield takeEvery(changeTaskStatusRequest().type, changeTaskStatusWorker);
}
