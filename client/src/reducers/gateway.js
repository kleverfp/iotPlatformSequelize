import { GATEWAY_ERROR, GET_GATEWAY } from "../actions/types";


const initialState ={
    gateway : null,
    gateways:[],
    loading : true,
    error:{}
};


export default function (state= initialState, action){
    const {type,payload} = action;

    switch(type){
        case GET_GATEWAY:
            return{
                ...state,
                gateway:payload,
                loading:false
            };
        case GATEWAY_ERROR:
            return{
                ...state,
                error:payload,
                loading:false
            };
        default:
            return state;
    }
}