var stream = require('stream');
const db = require("../models");
const beritaExclModel = db.beritaExcl;
var _ = require('lodash');
const { Op } = require("sequelize");



// API untuk Simpan data
exports.postBerita = async (req, res) => {
	// var timeStampFileName = (new Date()).getTime() +'_'+ req.file.originalname;
	var data = {
		title    : req.body.title ,
		news     : req.body.news,
		slug     : req.body.slug,
		imageNews: req.file == undefined ? null :req.file.buffer,
		type 	 : req.file == undefined ? null : req.file.mimetype,
		groups     : req.body.groups,
		userId   : req.body.userId,
	}

	if(req.file == undefined){
		delete data.imageNews
	}

	await beritaExclModel.create(data).then(file => {
		var sendRespone = file.dataValues; 
		delete sendRespone.imageNews
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


// API untuk GET data by slug
exports.getBySlug = (req, res) => {
    const slug = req.params.slug;
    beritaExclModel.findOne({ where: {slug: slug} }).then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Tutorial with id=" + id
        });
      });
}


// API untuk GET Top 5 data
exports.getBeritaTop5 = (req, res) => {
	beritaExclModel.findAll({

		order: [
			['createdAt', 'DESC'],
			['UpdatedAt', 'DESC'],
			
		],

		where: {
			[Op.and]: [
				{
					groups: {
					  [Op.notLike]: '%potensi-desa-wisata%'
					}
				},
				{
					groups: {
					  [Op.notLike]: '%daya-tarik%'
					}
				}
			],
		},

		// attributes:{exclude:["imageNews"]},
		// order : [ 'title' ] ,
		// where: {
		//    groups: {
		// 	$not: 'paket-wisata%',
		// 	$not: 'attraction%',
			 
		//    }
		// },
		// offset: 10,
		limit: 5
	 })
	.then(data => {
		res.send(data);
	})
	.catch(err => {
		res.status(500).send({
		message: "Error retrieving Tutorial with id=" + id
		});
	});
};


exports.getBeritaByGroups =  (req, res) => {
	var groupName = req.params.groupName
	beritaExclModel.findAll(
		{
			order: [
				['createdAt', 'DESC'],
				['UpdatedAt', 'DESC'],
				
			],
			where: {
				groups: groupName,
			},
			// attributes:{
			// 	exclude:["imageNews"]
			// }
		}
		).then(files => {
	    res.status(200).send(files);
	}).catch(err => {
		console.log(err);
		res.json({msg: 'Error', detail: err});
	});
}

// API untuk Update
exports.updateBerita =  (req, res) => {
	console.log('req.params ==>',req.params)
    const id = req.params.id;
	if(!id){
		res.status(404).send({
			message: "required id in param"
		});
	}else{

		if(req.file != undefined){
			req.body.imageNews = req.file.buffer
			req.body.type = req.file.mimetype
		}
		beritaExclModel.update(req.body, { where: { id: id }})
		   	.then( num => {
			  if (num == 1) {
				 beritaExclModel.findOne({
					where:{id:id},
					attributes : { exclude:['imageNews']}
				}).then(data => {	
					data.dataValues.message = "updateBerita was updated successfully."
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
exports.getByIdBerita = (req, res) => {
    const id = req.params.id;
    beritaExclModel.findByPk(id, {attributes:{exclude:["imageNews"]}})
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
exports.getAllBerita = (req, res) => {
	beritaExclModel.findAll(
		{
			order: [
				['createdAt', 'DESC'],
				['UpdatedAt', 'DESC'],
				
			],
			attributes:{exclude:["imageNews"]},
			where: {
				[Op.and]: [
					{
						groups: {
						  [Op.notLike]: '%paket-wisata%'
						}
					},
					{
						groups: {
						  [Op.notLike]: '%attraction%'
						}
					}
				],
			 },
	}).then(files => {
	    res.status(200).send(files);
	}).catch(err => {
		console.log(err);
		res.json({msg: 'Error', detail: err}).status(500);
	});
}


// API untuk get Image by Id
exports.getImageBerita = (req, res) => {
	beritaExclModel.findByPk(req.params.id).then(file => {
		var fileContents = Buffer.from(file.imageNews, "base64");
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



exports.deleteBerita = (req, res) => {
    const id = req.params.id;
    beritaExclModel.destroy({
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

