import {ALARM_ERROR, GET_ALARM, SET_ALARM} from "../actions/types";

const initialState ={
    alarm : null,
    error:{}
};


export default function (state= initialState, action){
    const {type,payload} = action;

    switch(type){
        case SET_ALARM:
        case GET_ALARM:
            return{
                ...state,
                alarm:payload
            };
        case ALARM_ERROR:
            return{
                ...state,
                error:payload
            }

        default:
            return state;
    }
}