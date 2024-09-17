import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import genreReducer from "./genre/genreSlice"
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore, 
  FLUSH, PAUSE, PERSIST, 
  PURGE, REGISTER, REHYDRATE } from "redux-persist";


const rootReducer = combineReducers({user: userReducer, genre: genreReducer})

const persistConfig = {
  key: 'root',
  version: 1,
  storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
})

export const persistor = persistStore(store);