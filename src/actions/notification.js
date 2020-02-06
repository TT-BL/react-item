import actionTypes from './actionTypes.js'
import {getNotifications} from '../requests'

const StartMarkAsRead=()=>{
    return dispatch=>{
        dispatch({
            type:actionTypes.START_MASK_AS_READ
        })
    }
}
const FinshMarkAsRead=()=>{
    return dispatch=>{
        dispatch({
            type:actionTypes.FINISH_MASK_AS_READ
        })
    }
}
export const MarkNotificationAsReadById=(id)=>{
    return dispatch=>{
        dispatch(StartMarkAsRead())
        setTimeout(()=>{
            dispatch({
                type:actionTypes.MARK_NOTIFICATIONS_AS_READ_BY_ID,payload:{
                    id
                }
            })
            dispatch(FinshMarkAsRead())
        },2000)
    }
}
export const MarkAllNotificationAsRead=()=>{
    return dispatch=>{
        dispatch(StartMarkAsRead())
        getNotifications().then(resp=>{
            
        })
        setTimeout(()=>{
            dispatch({
                type:actionTypes.MARK_ALL_NOTIFICATIONS_AS_READ,
            })
            dispatch(FinshMarkAsRead())
        },2000)
    }
}
export const ReceiveNotifications=()=>{
    return dispatch=>{
        dispatch(StartMarkAsRead())
        getNotifications().then(resp=>{
            dispatch({
                type:actionTypes.RECEIVE_NOTIFICATIONS,
                payload:{
                    list:resp.list
                }
            })
            dispatch(FinshMarkAsRead())
        })
    }
}