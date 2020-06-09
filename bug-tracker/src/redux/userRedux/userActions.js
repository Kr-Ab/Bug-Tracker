import 
{ 
    FETCH_USER_REQUEST,
    FETCH_USER_SUCCESS,
    FETCH_USER_FAILURE,
    TOGGLE_USER_OPERATION,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILURE
} from './userTypes';

export const fetchUserRequest = () => {
    return {
        type : FETCH_USER_REQUEST
    }
}

export const fetchUserSuccess = (user,token) => {
    return {
        type : FETCH_USER_SUCCESS,
        user : user,
        token : token
    }
}

export const fetchUserFailure = error => {
    return {
        type : FETCH_USER_FAILURE,
        payload : error
    }
}

export const toggleUserOperation = () => {
    return {
        type : TOGGLE_USER_OPERATION
    }
}

export const registerUserRequest = () => {
    return {
        type : REGISTER_USER_REQUEST
    }
}

export const registerUserSuccess = () => {
    return {
        type : REGISTER_USER_SUCCESS
    }
}

export const registerUserFailure = error => {
    return {
        type : REGISTER_USER_FAILURE,
        payload : error
    }
}

