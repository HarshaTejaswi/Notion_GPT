import { configureStore } from '@reduxjs/toolkit';
import localStorageReducer from './slice';

export default configureStore({
    reducer: {
        localStorageReducer: localStorageReducer
    },
});
