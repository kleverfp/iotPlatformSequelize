import {SENSIBILITY_ERROR, GET_SENSIBILITY, SET_SENSIBILITY} from "../actions/types";

const initialState ={
    sensibility : null,
    loading : true,
    error:{}
};


export default function (state= initialState, action){
    const {type,payload} = action;

    switch(type){
        case SET_SENSIBILITY:
        case GET_SENSIBILITY:
            return{
                ...state,
                sensibility:payload,
                loading:false
            };
        case SENSIBILITY_ERROR:
            return{
                ...state,
                error:payload,
                loading:false
            }

        default:
            return state;
    }
}