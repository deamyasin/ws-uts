import { all, put, takeLatest } from "redux-saga/effects";
import * as t from "../types";

function* fetchMahasiswas() {
	try {
		const response = yield fetch("/api/mahasiswas");

		const mahasiswaList = yield response.json();

		yield put({
			type: t.EMPLOYEE_FETCH_SUCCEEDED,
			payload: mahasiswaList.data,
		});
	} catch (error) {
		yield put({
			type: t.EMPLOYEE_FETCH_FAILED,
			payload: error.message,
		});
	}
}

function* watchFetchMahasiswas() {
	yield takeLatest(t.EMPLOYEE_FETCH_REQUESTED, fetchMahasiswas);
}

function* addMahasiswa(action) {
	try {
		const response = yield fetch("/api/mahasiswas", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(action.payload),
		});

		const newMahasiswa = yield response.json();

		yield put({
			type: t.EMPLOYEE_ADD_SUCCEEDED,
			payload: newMahasiswa.data,
		});
	} catch (error) {
		yield put({
			type: t.EMPLOYEE_ADD_FAILED,
			payload: error.message,
		});
	}
}

function* watchAddMahasiswa() {
	yield takeLatest(t.EMPLOYEE_ADD_REQUESTED, addMahasiswa);
}

function* deleteMahasiswa(action) {
	try {
		const response = yield fetch("/api/mahasiswas/" + action.payload, {
			method: "DELETE",
		});

		const deletedMahasiswa = yield response.json();

		yield put({
			type: t.EMPLOYEE_DELETE_SUCCEEDED,
			payload: deletedMahasiswa.data.id,
		});
	} catch (error) {
		yield put({
			type: t.EMPLOYEE_DELETE_FAILED,
			payload: error.message,
		});
	}
}

function* watchRemoveMahasiswa() {
	yield takeLatest(t.EMPLOYEE_DELETE_REQUESTED, deleteMahasiswa);
}

function* updateMahasiswa(action) {
	try {
		const response = yield fetch("/api/mahasiswas/" + action.payload._id, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(action.payload),
		});

		const updatedMahasiswa = yield response.json();

		yield put({
			type: t.EMPLOYEE_UPDATE_SUCCEEDED,
			payload: updatedMahasiswa.data,
		});
	} catch (error) {
		yield put({
			type: t.EMPLOYEE_UPDATE_FAILED,
			payload: error.message,
		});
	}
}

function* watchUpdateMahasiswa() {
	yield takeLatest(t.EMPLOYEE_UPDATE_REQUESTED, updateMahasiswa);
}

export default function* rootSaga() {
	yield all([
		watchFetchMahasiswas(),
		watchAddMahasiswa(),
		watchRemoveMahasiswa(),
		watchUpdateMahasiswa(),
	]);
}
