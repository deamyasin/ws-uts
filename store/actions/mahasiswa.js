import * as t from "../types";

export const setModalOpen = (isModalOpen) => {
	return {
		type: t.MODAL_OPEN,
		payload: isModalOpen,
	};
};

export const fetchMahasiswas = () => {
	return {
		type: t.MAHASISWA_FETCH_REQUESTED,
	};
};

export const addMahasiswa = (mahasiswa) => {
	return {
		type: t.MAHASISWA_ADD_REQUESTED,
		payload: mahasiswa,
	};
};

export const updateMahasiswa = (mahasiswa) => {
	return {
		type: t.MAHASISWA_UPDATE_REQUESTED,
		payload: mahasiswa,
	};
};

export const deleteMahasiswa = (id) => {
	return {
		type: t.MAHASISWA_DELETE_REQUESTED,
		payload: id,
	};
};

export const setSelectedMahasiswa = (id) => {
	return {
		type: t.MAHASISWA_SELECTED,
		payload: id,
	};
};
