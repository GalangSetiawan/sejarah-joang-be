var stream = require('stream');
const db = require("../models");
const kontakModel = db.kontak;
var _ = require('lodash');


// API untuk Simpan data
exports.postKontak = async (req, res) => {
	var data = {
		nama       : req.body.nama ,
		sosialMedia: req.body.sosialMedia,
		link       : req.body.link,
	}

	console.log('postPaketWisata data ===>',req)
	await kontakModel.create(data).then(file => {
		var sendRespone = file.dataValues; 
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
exports.updateKontak =  (req, res) => {
	console.log('req.params ==>',req.params)
    const id = req.params.id;
	if(!id){
		res.status(404).send({
			message: "required id in param"
		});
	}else{
		kontakModel.update(req.body, { where: { id: id }})
		   	.then( num => {
				   console.log('updatePaketWisata update ===>',num)
			  if (num == 1) {
				 kontakModel.findOne({
					where:{id:id},
				}).then(data => {	
					data.dataValues.message = "kontakModel was updated successfully."
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
exports.getByIdKontak = (req, res) => {
    const id = req.params.id;
    kontakModel.findByPk(id)
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
exports.getAllKontak = (req, res) => {
	kontakModel.findAll().then(files => {
	    res.status(200).send(files);
	}).catch(err => {
		console.log(err);
		res.json({msg: 'Error', detail: err});
	});
}



// API untuk hapus data
exports.deleteKontak = (req, res) => {
    const id = req.params.id;
    kontakModel.destroy({
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

