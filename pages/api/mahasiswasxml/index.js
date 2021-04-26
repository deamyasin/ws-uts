import Mahasiswa from "@/models/Mahasiswa";
import "@/utils/dbConnect";

export default async (req, res) => {
	const { method } = req;

	switch (method) {
		case "GET":
			try {
				const mahasiswas = await Mahasiswa.find({}).sort({
					createdAt: "desc",
				});
				var fs = require('fs');
				var json2xml = require('json2xml');
				fs.readFile('data.json','utf8', function read (err, Mahasiswa) {
					if (err) console.log(err);
					return fs.writeFile('data.xml', json2xml(JSON.parse(Mahasiswa)));
				})
				return res.status(200).json({
					success: true,
					data: mahasiswas,
					
				});
			} catch (error) {
				return res.status(400).json({
					success: false,
				});
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
