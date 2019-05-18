const allnightDrugstore = require("../models/allnight_drugstore_model");
const PostPhoto = require("../models/post_photo_model");

exports.allnight_drugstore_getall = (req, res, next) => {
  allnightDrugstore
    .find()
    .exec()
    .then(drugstores_list => {
      const count_list = {
        count: drugstores_list.length,
        list_of_drugstores: drugstores_list
      };
      res.status(200).json(count_list);
    })
    .catch(error => {
      res.status(500).json({
        error: error
      });
    });
};

exports.allnight_drugstore_getespecific = (req, res, next) => {
  allnightDrugstore
    .findById(req.params.allnightdrugstoreID)
    .exec()
    .then(drugstore => {
      if (drugstore) {
        res.status(200).json({
          drugstore: drugstore
        });
      } else {
        res.status(404).json({
          message: "Sorry, we couldn't find any drugstore for this id"
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        error: error
      });
    });
};

exports.allnight_drugstore_post = async (req, res, next) => {
  let postphoto = {};

  if (req.file !== undefined) {
    const { originalname: name, size, key, location: url } = req.file;

    postphoto = await PostPhoto.create({ name, size, key, url });
  }

  console.log("postphoto", postphoto);

  const addressParse = JSON.parse(req.body.address);

  const newOnDutyDrugStore = new allnightDrugstore({
    userWhoPostedId: req.body.userWhoPostedId,
    userWhoPostedType: req.body.userWhoPostedType,
    userWhoPostedName: req.body.userWhoPostedName,
    name: req.body.drugstorename,
    contact: JSON.parse(req.body.contact),
    description: req.body.description || "",
    photo: {
      photo_id: postphoto._id,
      photo_url: postphoto.url,
      key: postphoto.key
    },
    address: {
      street: addressParse.streetName,
      neighborhood: addressParse.neighborhoodName,
      number: addressParse.number,
      gpsCoordinates: {
        latitude: addressParse.gpsCoordinates.latitude,
        longitude: addressParse.gpsCoordinates.longitude
      }
    }
  });

  newOnDutyDrugStore
    .save()
    .then(result => {
      res.status(201).json({
        message: "Drugstore reported successfully",
        result: result
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

/* 
atualiza o produto, a requisição deve seguir este modelo:
[
	{
		"propName": "nome do campo a ser alterado",
		"value": "valor que deverá substituir o atual"
	}
]
*/
exports.allnight_drugstore_update = (req, res, next) => {
  const id = req.params.allnightdrugstoreID;
  const updateOperations = {};
  for (const operations of req.body) {
    updateOperations[operations.propName] = operations.value;
  }
  allnightDrugstore
    .updateOne({ _id: id }, { $set: updateOperations })
    .exec()
    .then(updateResult => {
      if (updateResult) {
        res.status(200).json({
          message: "Drugstore updated sucessfuly",
          result: updateResult
        });
      } else {
        res.status(404).json({
          message: "Sorry, we couldn't find any register for this id"
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        error: error
      });
    });
};

exports.allnight_drugstore_delete = async (req, res, next) => {
  allnightDrugstore
    .findById(req.params.allnightdrugstoreID)
    .exec()
    .then(async result => {
      if (result.photo.photo_id !== undefined) {
        const photo = await PostPhoto.findById(result.photo.photo_id);
        await photo.remove();
      }

      allnightDrugstore
        .deleteOne({ _id: req.params.allnightdrugstoreID })
        .exec()
        .then(result => {
          if (result) {
            res.status(200).json({
              message: "Post deleted successfuly",
              result: result
            });
          } else {
            res.status(404).json({
              message: "Sorry, we couldn't find any register for this id"
            });
          }
        });
    })
    .catch(error => {
      res.status(500).json({
        error: error
      });
    });
};
