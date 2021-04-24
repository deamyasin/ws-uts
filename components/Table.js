import { useSelector, useDispatch } from "react-redux";
import { PencilSVG, TrashSVG } from "@/icons";
import {
	deleteMahasiswa,
	fetchMahasiswas,
	setModalOpen,
	setSelectedMahasiswa,
} from "@/store";
import { useEffect } from "react";

export function Table() {
	const state = useSelector((state) => state.mahasiswa);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchMahasiswas());
	}, [dispatch]);

	return (
		<table className="table">
			<thead className="table__head">
				<tr>
					<th>Nama Lengkap</th>
					<th>NPM</th>
					<th>Email</th>
					<th>Alamat</th>
					<th>No. HP</th>
					<th>Actions</th>
				</tr>
			</thead>

			<tbody className="table__body">
				{state.mahasiswaList.map(({ _id, name, npm, email, address, phone }) => (
					<tr key={_id}>
						<td>{name}</td>
						<td>{npm}</td>
						<td>{email}</td>
						<td>{address}</td>
						<td>{phone}</td>
						<td>
							<button
								className="btn btn__compact btn__edit"
								onClick={() => {
									dispatch(setSelectedMahasiswa(_id));
									dispatch(setModalOpen(true));
								}}
							>
								<PencilSVG />
							</button>
							<button
								className="btn btn__compact btn__delete"
								onClick={() => {
									dispatch(deleteMahasiswa(_id));
								}}
							>
								<TrashSVG />
							</button>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}
