var stream = require('stream');
const db = require("../models");
const File = db.files;



exports.uploadFile = (req, res) => {
	console.log('uploadFile log req ===>',req);
	// console.log('uploadFile log res ===>',res);
	var timeStampFileName = (new Date()).getTime() +'_'+ req.file.originalname
	File.create({
		type: req.file.mimetype,
		name: timeStampFileName,
		data: req.file.buffer
	}).then(file => {
		const result = {
			status: "ok",
			idImage: file.dataValues.id,
			filename: timeStampFileName,
			message: "Upload Successfully!",
			downloadUrl: "http://localhost:8080/api/file/" + file.dataValues.id,
		}
		res.json(result);
	}).catch(err => {
		const result = {
			status: "error",
			error: err
		}
		res.json(result);
	});
}

exports.uploadMultipleFiles = async (req, res) => {
	const messages = [];

	for (const file of req.files) {
		const uploadfile = await File.create({
								type: file.mimetype,
								name: file.originalname,
								data: file.buffer
							});

        // It will now wait for above Promise to be fulfilled and show the proper details
        console.log(uploadfile);

	    if (!uploadfile){
			const result = {
				status: "fail",
				filename: file.originalname,				
				message: "Can NOT upload Successfully",
			}

			messages.push(result);
		} else {
			const result = {
				status: "ok",
				filename: file.originalname,
				message: "Upload Successfully!",
				downloadUrl: "http://localhost:8080/api/file/" + uploadfile.dataValues.id,
			}

			messages.push(result);
		}
	}

	return res.json(messages);
}

exports.listAllFiles = (req, res) => {
	File.findAll({attributes: ['id', 'name']}).then(files => {

		const fileInfo = [];

		console.log(files);
	  
		for(let i=0; i<files.length; i++){
			fileInfo.push({
				filename: files[i].name,
				id:files[i].dataValues.id,
				url: "http://localhost:8080/api/file/" + files[i].dataValues.id
			})
		}

	    res.json(fileInfo);
	}).catch(err => {
		console.log(err);
		res.json({msg: 'Error', detail: err});
	});
}

exports.downloadFile = (req, res) => {
	File.findByPk(req.params.id).then(file => {
		var fileContents = Buffer.from(file.data, "base64");
		var readStream = new stream.PassThrough();
		readStream.end(fileContents);
		
		res.set('Content-disposition', 'attachment; filename=' + file.name);
		res.set('Content-Type', file.type);

		readStream.pipe(res);
	}).catch(err => {
		console.log(err);
		res.json({msg: 'Error', detail: err});
	});
}