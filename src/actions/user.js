import actionTypes from './actionTypes'
import {loginRequest} from '../requests'

const StartLogin=()=>{
    return {
        type:actionTypes.START_LOGIN
    }
}
const LoginSuccess=(userInfo)=>{
    return {
        type:actionTypes.LOGIN_SUCESS,
        payload:{
            userInfo 
        }
    }
}
const LoginFailed=()=>{
    window.localStorage.removeItem('authToken')
    window.localStorage.removeItem('userInfo')
    window.sessionStorage.removeItem('authToken')
    window.sessionStorage.removeItem('userInfo')
    return {
        type:actionTypes.LOGIN_FAILED
    }
}
export const login=(userInfo)=>{
    return dispatch=>{
        dispatch(StartLogin())
        loginRequest(userInfo).then(resp=>{
            const {data,code}=resp.data
            if(code===200){
                if(userInfo.remember===true){
                    window.localStorage.setItem('authToken',data.authToken)
                    window.localStorage.setItem('userInfo',JSON.stringify(data))
                }
                else{
                    window.sessionStorage.setItem('authToken',data.authToken)
                    window.sessionStorage.setItem('userInfo',JSON.stringify(data))
                }
                dispatch(LoginSuccess(data))
            }
            else{
                dispatch(LoginFailed())
            }
        })
    }
} 
export const logout=()=>{
    return dispatch=>dispatch(LoginFailed())
}