var stream = require('stream');
const db = require("../models");
const fasilitasModel = db.fasilitas;
var _ = require('lodash');




// API untuk Simpan data
exports.postFasilitas = async (req, res) => {
	var data = {
		namaFasilitas: req.body.namaFasilitas ,
		deskripsi    : req.body.deskripsi,
		icon         : req.body.icon,
		userId       : req.body.userId,
	}
	await fasilitasModel.create(data).then(file => {
		var sendRespone = file.dataValues; 
		delete sendRespone.icon
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
exports.updateFasilitas =  (req, res) => {
	console.log('req.params ==>',req.params)
    const id = req.params.id;
	if(!id){
		res.status(404).send({
			message: "required id in param"
		});
	}else{
		fasilitasModel.update(req.body, { where: { id: id }})
		   	.then( num => {
			  if (num == 1) {
				 fasilitasModel.findOne({
					where:{id:id},
					attributes : { exclude:['icon']}
				}).then(data => {	
					data.dataValues.message = "fasilitasModel was updated successfully."
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
exports.getByIdFasilitas = (req, res) => {
    const id = req.params.id;
    fasilitasModel.findByPk()
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
exports.getAllFasilitas = (req, res) => {
	fasilitasModel.findAll().then(files => {
		// fasilitasModel.findAll({attributes:{exclude:["icon"]}}).then(files => {
			res.status(200).send(files);
	}).catch(err => {
		console.log(err);
		res.json({msg: 'Error', detail: err});
	});
}


exports.deleteFasilitas = (req, res) => {
    const id = req.params.id;
    fasilitasModel.destroy({
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

