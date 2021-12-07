import {ALARM_ERROR, GET_ALARM, SET_ALARM} from "../actions/types";

const initialState ={
    alarm : null,
    loading : true,
    error:{}
};


export default function (state= initialState, action){
    const {type,payload} = action;

    switch(type){
        case SET_ALARM:
        case GET_ALARM:
            return{
                ...state,
                alarm:payload,
                loading:false
            };
        case ALARM_ERROR:
            return{
                ...state,
                error:payload,
                loading:false
            }

        default:
            return state;
    }
}