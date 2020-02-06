import actionTypes from '../actions/actionTypes'
const isLogin= Boolean(window.localStorage.getItem('authToken'))||Boolean(window.sessionStorage.getItem('authToken'))
const userInfo= JSON.parse(window.localStorage.getItem('userInfo'))||JSON.parse(window.sessionStorage.getItem('userInfo'))
const initState = {
    ...userInfo,
    isLogin,
    isLoading: false
}

export default (state = initState, action) => {
    switch (action.type) {
        case actionTypes.START_LOGIN:
            return {
                ...state,
                isLoading: true
            }
        case actionTypes.LOGIN_SUCESS:
            return {
                ...state,
                ...action.payload.userInfo,
                isLoading: false,
                isLogin: true
            }
        case actionTypes.LOGIN_FAILED:
            return {
                id: '',
                displayName: '',
                role: '',
                avater: '',
                isLogin:false,
                isLoading: false
            }
        default:
            return state
    }
}