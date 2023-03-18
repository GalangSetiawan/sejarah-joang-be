var stream = require('stream');
const db = require("../models");
const websiteInfoModel = db.websiteInfos;
var _ = require('lodash');




// API untuk Simpan data
exports.postWebsiteInfo = async (req, res) => {
	var timeStampFileName = (new Date()).getTime() +'_'+ req.file.originalname;
	var data = {
		mapLocation     : req.body.mapLocation ,
		websiteName     : req.body.websiteName,
		websiteImage    : req.file == undefined ? null: req.file.buffer,
		type 	        : req.file == undefined ? null: req.file.mimetype,
		address         : req.body.address,
		websiteImageName: timeStampFileName
	}
	await websiteInfoModel.create(data).then(file => {
		var sendRespone = file.dataValues; 
		delete sendRespone.websiteImage
		sendRespone.status  = "ok"
		sendRespone.message = "Upload Successfully!",
		res.status(200);
		res.json(sendRespone);
	}).catch(err => {
		const result = {
			status: "error",
			error: err
		}
		res.json(result);
	});
}


// API untuk Update
exports.updateWebsiteInfo = (req, res) => {
	console.log('req.params ==>',req.params)
    const id = req.params.id;
	if(!id){
		res.status(404).send({
			message: "required id in param"
		});
	}else{
		if(req.file != undefined){
			req.body.websiteImage = req.file.buffer
			req.body.type = req.file.mimetype
		}
		websiteInfoModel.update(req.body, {
			where: { id: id }
		  })
			.then(num => {
			  if (num == 1) {
				websiteInfoModel.findByPk(id).then(data => {	
					data. message =  "Tutorial was updated successfully."				
					res.status(200).send(data);
				})
			  } else {
				  res.send({
					  message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
				  });
			  }
			})
			.catch(err => {
			  res.status(500).send({
				message: "Error updating Tutorial with id=" + id
			  });
		  });
	}
};


// API untuk GET data
exports.getWebsiteInfo = (req, res) => {
	websiteInfoModel.findAll({attributes: ['id', 'websiteName', 'address', 'mapLocation']}).then(files => {
	    res.status(200).send(files[0]);
	}).catch(err => {
		console.log(err);
		res.json({msg: 'Error', detail: err});
	});
}


// API untuk get Image by Id
exports.getImageWebsiteInfo = (req, res) => {
	websiteInfoModel.findByPk(req.params.id).then(file => {
		var fileContents = Buffer.from(file.websiteImage, "base64");
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



exports.deleteWebsiteInfo = (req, res) => {
    const id = req.params.id;
    websiteInfoModel.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Tutorial was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Tutorial with id=" + id
        });
      });
  };

