import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import { logger } from 'redux-logger';
import tasks, { tasksSaga } from './features/tasks';

const reducer = {
  tasks,
};

function* rootSaga() {
  yield all([tasksSaga()]);
}

const initialiseSagaMiddleware = createSagaMiddleware();

const middleware = [...getDefaultMiddleware(), initialiseSagaMiddleware];
if (process.env.NODE_ENV === `development`) {
  middleware.push(logger);
}
const store = configureStore({
  reducer,
  middleware,
  devTools: process.env.NODE_ENV !== 'production',
});

initialiseSagaMiddleware.run(rootSaga);

export default store;
