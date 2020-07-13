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
  },
});

export const { fetchTasksRequest } = tasksFeature.actions;
export default tasksFeature.reducer;

function* fetchtasksWorker() {
  try {
    const payload = yield call(api.tasks.getAll);
    yield put(fetchtasksSuccess(payload.data));
  } catch (e) {
    yield put(fetchtasksFail(e.message));
  }
}

export function* tasksSaga() {
  yield takeEvery(fetchtasksRequest().type, fetchtasksWorker);
}
