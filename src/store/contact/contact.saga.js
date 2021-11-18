import { put, takeLatest } from 'redux-saga/effects';
import jwt_decode from "jwt-decode";
import setAuthToken from "../../utils/setAuthToken";
import api from '../../api/api';

export function* fetchContactsSaga(action) {
	try {
		const response = yield call(api.fetchContacts());
		const contacts = yield response.json();
		yield put({ type: action.FETCH_CONTACTS_SUCCEEDED, contacts: contacts });
	} catch (error) {
		throw error.response.data;
	}
};

export function* addNewContactSaga(action) {
	try {
		const response = yield api.addNewContact(action.payload);
		const contacts = yield response.json();
		yield put({ type: actions.ADD_CONTACT_SUCCEEDED });
		yield put({ type: actions.FETCH_CONTACTS_SUCCEEDED, contacts: contacts });
	} catch (error) {
		throw error.response.data;
	}
};

export function* removeContactSaga(action) {
	try {
		const response = yield api.removeContact(action.payload)
		const contacts = yield response.json();
		yield put({ type: actions.FETCH_CONTACTS_SUCCEEDED, contacts: contacts });
	} catch (error) {
        throw error.response.data;
	}
};

// export function* completeTodoSaga(action) {
// 	try {
// 		const response = yield API.completeTodo(action.id)
// 		const todos = yield response.json();
// 		yield put({ type: actions.COMPLETE_TODO_SUCCEEDED });
// 		yield put({ type: actions.FETCH_TODOS_SUCCEEDED, todos: todos });
// 	} catch (error) {
// 		yield put({ type: actions.COMPLETE_TODO_FAILED, message: error.message });
// 	}
// };