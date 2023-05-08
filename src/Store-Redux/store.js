import {configureStore} from '@reduxjs/toolkit'

import authReducer from './authSlice';
import seenUnseenreducer from './seenUnseenSlice';
const store=configureStore({
    reducer:{
        auth:authReducer,seen:seenUnseenreducer
    }
})



export default store;