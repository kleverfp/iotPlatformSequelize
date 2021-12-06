import {combineReducers} from 'redux';
import alert from './alert';
import auth from './auth';
import gateway from './gateway';
import sensor from './sensor';
import sensorAlarm from './sensorAlarm';

export default combineReducers({
alert,
auth,
gateway,
sensor,
sensorAlarm
})