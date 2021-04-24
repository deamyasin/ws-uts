import mongoose from "mongoose";

const MahasiswaSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Name is required!"],
		trim: true,
	},
	npm: {
		type: String,
		required: [true, "npm is required!"],
		trim: true,
	},
	email: {
		type: String,
		required: [true, "Email is required!"],
		trim: true,
	},
	address: {
		type: String,
		required: [true, "Address is required!"],
		trim: true,
	},
	phone: {
		type: String,
		required: [true, "Phone is required!"],
		trim: true,
	},
	createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Mahasiswa ||
	mongoose.model("Mahasiswa", MahasiswaSchema);
