import Mahasiswa from "@/models/Mahasiswa";
import "@/utils/dbConnect";
var json2xml = require('@/node_modules/json2xml/json2xml.js');

export default async (req, res) => {
	const { method } = req;

	switch (method) {
		case "GET":
			try {
				const mahasiswas = await Mahasiswa.find({}).sort({
					createdAt: "desc",
				});
				return res.status(200).json2xml(
					{header: true},
					{success: true},
					JSON.parse(Mahasiswa)
				);
			} catch (error) {
				return res.status(400).json2xml(
					{success: false}
				);
			}
		case "POST":
			try {
				const mahasiswas = await Mahasiswa.create(req.body);
				return res.status(201).json({
					success: true,
					data: mahasiswas,
				});
			} catch (error) {
				return res.status(400).json({
					success: false,
				});
			}
		default:
			res.setHeaders("Allow", ["GET", "POST"]);
			return res
				.status(405)
				.json({ success: false })
				.end(`Method ${method} Not Allowed`);
	}
};
