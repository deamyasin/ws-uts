import { HYDRATE } from "next-redux-wrapper";
import * as t from "../types";

const initialState = {
	mahasiswaList: [],
	selectedMahasiswa: undefined,
	isModalOpen: false,
};

const mainReducer = (state = initialState, action) => {
	switch (action.type) {
		case HYDRATE:
			return { ...state, ...action.payload };
		case t.MODAL_OPEN:
			return {
				...state,
				isModalOpen: action.payload,
			};
		case t.MAHASISWA_FETCH_SUCCEEDED:
			return {
				...state,
				mahasiswaList: action.payload,
			};
		case t.MAHASISWA_ADD_SUCCEEDED:
			return {
				...state,
				mahasiswaList: [action.payload, ...state.mahasiswaList],
			};
		case t.MAHASISWA_UPDATE_SUCCEEDED:
			const updatedMahasiswa = state.mahasiswaList.map((mahasiswa) => {
				if (mahasiswa._id === action.payload._id) {
					return {
						...mahasiswa,
						name: action.payload.name,
						email: action.payload.email,
						address: action.payload.address,
						phone: action.payload.phone,
					};
				}
				return mahasiswa;
			});

			return { ...state, mahasiswaList: updatedMahasiswa };
		case t.MAHASISWA_DELETE_SUCCEEDED:
			const newMahasiswaList = state.mahasiswaList.filter(
				(mahasiswa) => mahasiswa._id !== action.payload
			);
			return {
				...state,
				mahasiswaList: newMahasiswaList,
			};
		case t.MAHASISWA_SELECTED:
			const selectedMahasiswa = state.mahasiswaList.find(
				(mahasiswa) => mahasiswa._id === action.payload
			);
			return {
				...state,
				selectedMahasiswa,
			};
		default:
			return state;
	}
};

export default mainReducer;
