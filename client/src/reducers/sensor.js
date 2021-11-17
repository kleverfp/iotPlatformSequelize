import { CLEAR_SENSOR, SENSOR_ERROR, GET_SENSOR, UPDATE_SENSOR } from "../actions/types";


const initialState ={
    sensor : null,
    sensors:[],
    loading : true,
    error:{}
};


export default function (state= initialState, action){
    const {type,payload} = action;

    switch(type){
        case GET_SENSOR:
        case UPDATE_SENSOR:
            return{
                ...state,
                sensor:payload,
                loading:false
            };
        case SENSOR_ERROR:
            return{
                ...state,
                error:payload,
                loading:false
            };
        case UPDATE_SENSOR:
            return{
                ...state,
                loading:false
            }
        case CLEAR_SENSOR:
            return{
                ...state,
                sensor:null,
                sensors:[],
                loading:false

            }
        default:
            return state;
    }
}