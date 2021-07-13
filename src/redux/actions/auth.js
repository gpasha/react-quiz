import axios from 'axios'
import { AUTH_SUCCESS, AUTH_LOGOUT } from './actionTypes'

export function auth(email, password, isLogin) {
    return async dispatch => {
        const authData = {
            email,
            password,
            returnSecureToken: true
        }

        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC5uqqDLCVWMstahMV1c8HuSdzoiijJlgY'

        if (isLogin) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC5uqqDLCVWMstahMV1c8HuSdzoiijJlgY'
        }
        
        const response = await axios.post(url, authData)
        const data = response.data
        const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000)

        localStorage.getItem('token', data.idToken)
        localStorage.getItem('userId', data.localId)
        localStorage.getItem('expirationDate', expirationDate)

        dispatch(authSuccess(data.idToken))
        dispatch(authLogout(data.expiresIn))
    }
}

export function authSuccess(token) {
    return {
        type: AUTH_SUCCESS,
        token
    }
}

export function authLogout(time) {
    return dispatch => {
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        localStorage.removeItem('expirationDate')
        setTimeout(() => {
            dispatch(logout())
        }, time * 1000)
    }
}

export function logout() {
    return {
        type: AUTH_LOGOUT
    }
}