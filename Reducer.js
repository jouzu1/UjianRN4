import { combineReducers } from "redux"
import {GET_DATA} from './Action'


const initialState = {
    user: [],
    // favorites: [],
};

const userData = [{
    id:0,
    name:"",
    email:"",
    phone:"",
    address:"",
    isLogin:false
}]
const laporanState = [{
    id:0,
    name:"",
    kejadian:0,
    alamat:"",
    keterangan:"",
    gambara:""
}]


function UserReducer(state = userData,action){
    if(action.type==="SET_USER"){
        return{
            ...state,
            [action.inputType]:action.inputValue
        }
    }
    return state;
}

function LaporanReducer (state = laporanState,action){
    if(action.type === "SET_LAPORAN"){
        return {
            ...state,
            [action.inputType]:action.inputValue
        }
    }
    return state;
}

function getDataReducer(state = initialState, action) {
    switch (action.type) {
      case GET_DATA:
        return {...state, DATA: action.payload};
      default:
        return state;
    }
  }


const reducer = combineReducers({
    LaporanReducer,
    UserReducer,
    getDataReducer
})

export default reducer