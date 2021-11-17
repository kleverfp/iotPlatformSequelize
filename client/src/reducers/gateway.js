import { CLEAR_GATEWAY, GATEWAY_ERROR, GET_GATEWAY, UPDATE_GATEWAY } from "../actions/types";


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
        case UPDATE_GATEWAY:
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
        case CLEAR_GATEWAY:
            return{
                ...state,
                gateway:null,
                gateways:[],
                loading:false

            }
        default:
            return state;
    }
}