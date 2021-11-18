import {all,call} from 'redux-saga/effects'
import { addNewContactSaga, fetchContactsSaga, removeContactSaga } from './contact/contact.saga';
import contactTypes from './contact/contact.types';
import actionLoginUser from './user/user.saga';

export default function* rootSaga(){
    yield all([
        ...actionLoginUser
    ]);

    yield takeEvery(contactTypes.FETCH_CONTACTS_START, fetchContactsSaga);
	yield takeEvery(contactTypes.ADD_CONTACT_START, addNewContactSaga);
	yield takeEvery(contactTypes.REMOVE_CONTACT_START, removeContactSaga);
}