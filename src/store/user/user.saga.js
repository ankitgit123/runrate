import { put, takeLatest } from 'redux-saga/effects';
import jwt_decode from "jwt-decode";
import setAuthToken from "../../utils/setAuthToken";
import api from '../../api/api';

function* loginUser(userData) {
    try{
        const json=yield api.loginUser(userData.userData).then(res=>{
            const {token}=res.token;
            localStorage.setItem("jwtToken",token);
            setAuthToken(token);
            const decoded=jwt_decode(token);
            return decoded;
        }).catch(err=>{
            throw err.response.data;
        });
        yield put({
            type:"SET_CURRENT_USER",
            json:json,
        });
    }    catch(error){
        yield put({
            type:"SET_CURRENT_USER_FAILED",
            error,
        });
    }
}

function* logOutUser(userData) {
    localStorage.removeItem("jwtToken");
    setAuthToken(false);
    yield put({
        type: "SET_CURRENT_USER",
        json: {},
    });
}

export default function* actionLoginUser() {
    yield takeLatest('LOGIN_USER', loginUser)
    yield takeLatest('LOGOUT_USER', logOutUser)
}