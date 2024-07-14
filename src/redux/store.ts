import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import transactionsReducer from './slices/transactionsSlice';
import rootSaga from "./sagas/root-saga.ts";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
  devTools: true,
});

sagaMiddleware.run(rootSaga);

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
