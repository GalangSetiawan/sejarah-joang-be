var stream = require('stream');
const db = require("../models");
const paketWisataModel = db.paketWisata;
var _ = require('lodash');


// API untuk Simpan data
exports.postPaketWisata = async (req, res) => {
	var data = {
		price         : req.body.price ,
		title         : req.body.title,
		description   : req.body.description,
		time          : req.body.time,
		userId        : req.body.userId,
		paketWisataImg: req.file == undefined ? null :req.file.buffer,
	}

	console.log('postPaketWisata data ===>',req)
	await paketWisataModel.create(data).then(file => {
		var sendRespone = file.dataValues; 
		delete sendRespone.paketWisataImg
		sendRespone.status  = "ok"
		sendRespone.message = "Data Saved Successfuly!",
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
exports.updatePaketWisata =  (req, res) => {
	console.log('req.params ==>',req.params)
    const id = req.params.id;
	if(!id){
		res.status(404).send({
			message: "required id in param"
		});
	}else{
		if(req.file != undefined){
			req.body.paketWisataImg = req.file.buffer
		}
		paketWisataModel.update(req.body, { where: { id: id }})
		   	.then( num => {
			  if (num == 1) {
				 paketWisataModel.findOne({
					where:{id:id},
					attributes : { exclude:['paketWisataImg']}
				}).then(data => {	
					data.dataValues.message = "paketWisataModel was updated successfully."
					res.status(200).send(data)
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


// API untuk GET data by id
exports.getByIdPaketWisata = (req, res) => {
    const id = req.params.id;
    paketWisataModel.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Tutorial with id=" + id
        });
      });
  };


// API untuk GET data
exports.getAllPaketWisata = (req, res) => {
	paketWisataModel.findAll().then(files => {
	    res.status(200).send(files);
	}).catch(err => {
		console.log(err);
		res.json({msg: 'Error', detail: err});
	});
}


// API untuk get Image by Id
exports.getImageWisata = (req, res) => {
	paketWisataModel.findByPk(req.params.id).then(file => {
		var fileContents = Buffer.from(file.paketWisataImg, "base64");
		var readStream = new stream.PassThrough();
		readStream.end(fileContents);
		res.set('Content-disposition', 'attachment; filename=' + file.name);
		res.set('Content-Type', 'image/png');
		readStream.pipe(res);
	}).catch(err => {
		console.log(err);
		res.json({msg: 'Error', detail: err});
	});
}

// API untuk hapus data
exports.deletePaketWisata = (req, res) => {
    const id = req.params.id;
    paketWisataModel.destroy({
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

