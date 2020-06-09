import 
{ 
    FETCH_USER_REQUEST,
    FETCH_USER_SUCCESS,
    FETCH_USER_FAILURE,
    TOGGLE_USER_OPERATION,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILURE
} from './userTypes'

const initialState = {
    loading:false,
    isLogin:true,
    loggedin:false,
    user: {},
    loginerror:``,

    isRegister:false,
    registererror:``,

    authtoken:``
}

const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_USER_REQUEST: return {
            ...state,
            loading:true,
            loggedin:false
        }
        case FETCH_USER_SUCCESS: return {
            ...state,
            loading:false,
            isLogin:false,
            loggedin:true,
            user: action.user,
            error:``,
            authtoken : action.token
        }
        case FETCH_USER_FAILURE: return {
            ...state,
            loading:false,
            loggedin:false,
            user: [],
            error:action.payload
        }

        case TOGGLE_USER_OPERATION : return {
            ...state,
            isLogin: !state.isLogin,
            isRegister: !state.isRegister
        }

        case REGISTER_USER_REQUEST: return {
            ...state,
            loading:true,
        }
        case REGISTER_USER_SUCCESS: return {
            ...state,
            loading:false,
        }
        case REGISTER_USER_FAILURE: return {
            ...state,
            loading:false,
            registererror:action.payload,
        }
        default : return state
    }
}

export default userReducer