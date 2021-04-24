import * as t from "../types";

export const setModalOpen = (isModalOpen) => {
	return {
		type: t.MODAL_OPEN,
		payload: isModalOpen,
	};
};

export const fetchMahasiswas = () => {
	return {
		type: t.EMPLOYEE_FETCH_REQUESTED,
	};
};

export const addMahasiswa = (mahasiswa) => {
	return {
		type: t.EMPLOYEE_ADD_REQUESTED,
		payload: mahasiswa,
	};
};

export const updateMahasiswa = (mahasiswa) => {
	return {
		type: t.EMPLOYEE_UPDATE_REQUESTED,
		payload: mahasiswa,
	};
};

export const deleteMahasiswa = (id) => {
	return {
		type: t.EMPLOYEE_DELETE_REQUESTED,
		payload: id,
	};
};

export const setSelectedMahasiswa = (id) => {
	return {
		type: t.EMPLOYEE_SELECTED,
		payload: id,
	};
};
