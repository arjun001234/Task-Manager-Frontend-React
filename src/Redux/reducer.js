import { LOGIN, LOGOUT, REGISTER } from "./actions"

export function reducer(state,action) {
    if(action.type === LOGIN){
        if(action.payload.result){
            return { ...state,isLoading: false,isAuthenticated: true,user: action.payload.result.data.user,token: localStorage.setItem("token",action.payload.result.data.token)}
        }
        if(action.payload.error){
            return {...state,isLoading: false,errors: action.payload.error}
        }
    }
    if(action.type === REGISTER){
        if(action.payload.result){
            return { ...state,isLoading: false,isAuthenticated: true,user: action.payload.result.data.user,token: localStorage.setItem("token",action.payload.result.data.token)}
        }
        if(action.payload.error){
            if(action.payload.error.email){
                return {...state,isLoading: false,errors: 'Invalid Email'}
            }
            if(action.payload.error.password){
                return {...state,isLoading: false,errors: 'Invalid password'}
            }
            return { ...state,isLoading: false,errors: 'This Email Already Exist'}
        }
    }
    if(action.type === LOGOUT){
        console.log(action.payload)
        if(action.payload.result){
            return {...state,isLoading: false,isAuthenticated: false,token: localStorage.removeItem("token")}
        }
    }
    return state
}