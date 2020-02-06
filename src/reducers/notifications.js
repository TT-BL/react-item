import actionTypes from '../actions/actionTypes'
const initState = {
    isLoading: false,
    list: [
        {
            id: 1,
            title: '通知11',
            desc: '111Ant Design, a design language for background applications, is refined by Ant UED TeamAnt Design, a design language for background applications, is refined by Ant UED Team',
            hasRead: false
        },
        {
            id: 2,
            title: '通知22',
            desc: '22Ant Design, a design language for background applications, is refined by Ant UED TeamAnt Design, a design language for background applications, is refined by Ant UED Team',
            hasRead: true
        }
    ]
}
export default (state = initState, action) => {
    switch (action.type) {
        case actionTypes.START_MASK_AS_READ:
            return {
                ...state,
                isLoading: true
            }
        case actionTypes.FINISH_MASK_AS_READ:
            return {
                ...state,
                isLoading: false
            }
        case actionTypes.MARK_NOTIFICATIONS_AS_READ_BY_ID:
            const newList = state.list.map(item => {
                if (item.id === action.payload.id)
                    item.hasRead = true
                return item
            })
            return {
                ...state,
                list: newList
            }
        case actionTypes.MARK_ALL_NOTIFICATIONS_AS_READ:
            return {
                ...state,
                list: state.list.map(item => {
                    item.hasRead = true
                    return item
                })
            }
        case actionTypes.RECEIVE_NOTIFICATIONS:
            return {
                ...state,
                list: action.payload.list
            }
        default:
            return state
    }
}