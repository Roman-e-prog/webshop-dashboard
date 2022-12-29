import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import userReducer from '../features/user/userSlice'
import productReducer from '../features/products/productsSlice';
import descriptionItemReducer from '../features/descriptionItems/descriptionItemSlice'
import storage from 'redux-persist/lib/storage'
import {persistReducer} from 'redux-persist'

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  middleware: (getDefaultMiddleware:any) =>
    //cache the querys results
    getDefaultMiddleware({
      serializableCheck: false
    }),
}
// const reducer = combineReducers({
//   user:userReducer, 
//   product:productReducer
// })
const persistedUserReducer = persistReducer(persistConfig,userReducer) //state we want to persist
const persistedProductReducer = persistReducer(persistConfig, productReducer)
export const store = configureStore({
  reducer: {
    auth:authReducer,
    user:persistedUserReducer,
    product:persistedProductReducer,
    descriptionItem:descriptionItemReducer,
  },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;