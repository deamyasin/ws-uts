import { useEffect } from "react";
import ReactDOM from "react-dom";

import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import cx from "clsx";

import { CheckSVG, CloseSVG } from "@/icons";
import {
	addMahasiswa,
	setModalOpen,
	setSelectedMahasiswa,
	updateMahasiswa,
} from "@/store";

export function Modal() {
	const { register, handleSubmit, errors, reset, setValue } = useForm();

	const state = useSelector((state) => state.mahasiswa);

	const dispatch = useDispatch();

	const closeModal = () => {
		reset();
		dispatch(setModalOpen(false));
		dispatch(setSelectedMahasiswa(undefined));
	};

	const onSubmitHandler = (data) => {
		if (data) {
			closeModal();
		}
		if (state.selectedMahasiswa) {
			dispatch(
				updateMahasiswa({
					_id: state.selectedMahasiswa._id,
					...data,
				})
			);
		} else {
			dispatch(addMahasiswa(data));
		}
	};

	useEffect(() => {
		if (state.selectedMahasiswa) {
			setValue("name", state.selectedMahasiswa.name);
			setValue("npm", state.selectedMahasiswa.npm);
			setValue("email", state.selectedMahasiswa.email);
			setValue("address", state.selectedMahasiswa.address);
			setValue("phone", state.selectedMahasiswa.phone);
		}
	}, [state.selectedMahasiswa, setValue]);

	return state.isModalOpen
		? ReactDOM.createPortal(
				<div className="modal">
					<div className="modal__content">
						<header className="header modal__header">
							<h1 className="header__h2">
								{state.selectedMahasiswa ? (
									<>
										Edit <span>Mahasiswa</span>
									</>
								) : (
									<>
										Add <span>Mahasiswa</span>
									</>
								)}
							</h1>
							<button
								className="btn btn__compact btn__close"
								onClick={closeModal}
							>
								<CloseSVG />
							</button>
						</header>

						<form
							className="form modal__form"
							onSubmit={handleSubmit(onSubmitHandler)}
							noValidate
						>
							<div className="form__element">
								<label
									htmlFor="nameInput"
									className={cx("label", errors.name && "label--error")}
								>
									{errors.name ? (
										"Full name is required!"
									) : (
										<>
											Nama Lengkap&nbsp;<span className="label__required">*</span>
										</>
									)}
								</label>
								<input
									type="text"
									id="nameInput"
									name="name"
									placeholder="Full name"
									className={cx("input", errors.name && "input--error")}
									ref={register({ required: true })}
								/>
							</div>

							<div className="form__element">
								<label
									htmlFor="npm"
									className={cx("label", errors.npm && "label--error")}
								>
									{errors.npm ? (
										`${errors.npm.message}`
									) : (
										<>
											NPM&nbsp;<span className="label__required">*</span>
										</>
									)}
								</label>
								<input
									type="number"
									id="npm"
									name="npm"
									placeholder="NPM"
									className={cx("input", errors.npm && "input--error")}
									ref={register({
										required: "NPM is required!",
										minLength: {
											value: 9,
											message: "Minimum of 9 digits",
										},
										maxLength: {
											value: 9,
											message: "Maximum of 9 digits",
										},
									})}
								/>
							</div>

							<div className="form__element">
								<label
									htmlFor="emailInput"
									className={cx("label", errors.email && "label--error")}
								>
									{errors.email ? (
										`${errors.email.message}`
									) : (
										<>
											Email&nbsp;<span className="label__required">*</span>
										</>
									)}
								</label>
								<input
									type="email"
									id="emailInput"
									name="email"
									placeholder="Email"
									className={cx("input", errors.email && "input--error")}
									ref={register({
										required: "Email is required!",
										pattern: {
											value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
											message: "Invalid email address!",
										},
									})}
								/>
							</div>

							<div className="form__element">
								<label
									htmlFor="addressArea"
									className={cx("label", errors.address && "label--error")}
								>
									{errors.address ? (
										"Address is required!"
									) : (
										<>
											Alamat&nbsp;<span className="label__required">*</span>
										</>
									)}
								</label>
								<textarea
									type="text"
									id="addressArea"
									name="address"
									placeholder="Address"
									className={cx("area", errors.address && "input--error")}
									ref={register({ required: true })}
								/>
							</div>

							<div className="form__element">
								<label
									htmlFor="phoneNumber"
									className={cx("label", errors.phone && "label--error")}
								>
									{errors.phone ? (
										`${errors.phone.message}`
									) : (
										<>
											No. Telp&nbsp;<span className="label__required">*</span>
										</>
									)}
								</label>
								<input
									type="number"
									id="phoneNumber"
									name="phone"
									placeholder="Phone"
									className={cx("input", errors.phone && "input--error")}
									ref={register({
										required: "Phone is required!",
										minLength: {
											value: 11,
											message: "Minimum of 11 digits",
										},
										maxLength: {
											value: 12,
											message: "Maximum of 12 digits",
										},
									})}
								/>
							</div>

							<div className="form__action">
								<button
									className="btn btn__icon btn__cancel"
									type="button"
									onClick={closeModal}
								>
									<CloseSVG /> Cancel
								</button>
								<button className="btn btn__primary btn__icon" type="submit">
									<CheckSVG /> {state.selectedMahasiswa ? "Update" : "Submit"}
								</button>
							</div>
						</form>
					</div>
				</div>,
				document.body
		  )
		: null;
}
