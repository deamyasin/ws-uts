import Mahasiswa from "@/models/Mahasiswa";
import "@/utils/dbConnect";

export default async (req, res) => {
	const {
		query: { id },
		method,
	} = req;

	switch (method) {
		case "GET":
			try {
				const mahasiswa = await Mahasiswa.findById(id);

				return res.status(200).json({
					success: true,
					data: mahasiswa,
				});
			} catch (error) {
				return res.status(404).json({
					success: false,
				});
			}
		case "PUT":
			try {
				const mahasiswa = await Mahasiswa.findByIdAndUpdate(id, req.body, {
					new: true,
					runValidators: true,
				});

				return res.status(200).json({
					success: true,
					data: mahasiswa,
				});
			} catch (error) {
				return res.status(400).json({
					success: false,
				});
			}
		case "DELETE":
			try {
				await Mahasiswa.deleteOne({ _id: id });

				return res.status(200).json({
					success: true,
					data: { id },
				});
			} catch (error) {
				return res.status(400).json({
					success: false,
				});
			}
		default:
			res.setHeaders("Allow", ["GET", "PUT", "DELETE"]);
			return res
				.status(405)
				.json({ success: false })
				.end(`Method ${method} Not Allowed`);
	}
};
