import { combineReducers } from "redux"


const userData = {
    id:0,
    name:"",
    email:"",
    phone:"",
    address:"",
    isLogin:false
}
const laporanState = {
    id:0,
    name:"",
    kejadian:0,
    alamat:"",
    keterangan:"",
    gambara:""
}


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



const reducer = combineReducers({
    LaporanReducer,
    UserReducer
})

export default reducer