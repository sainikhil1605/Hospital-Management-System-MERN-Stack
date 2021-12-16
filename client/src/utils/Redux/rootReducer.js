import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
const rootReducer = combineReducers({ login: loginReducer });

export default rootReducer;
