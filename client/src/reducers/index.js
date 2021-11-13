import {combineReducers} from 'redux';
import alert from './alert';
import auth from './auth';
import gateway from './gateway';

export default combineReducers({
alert,
auth,
gateway
})