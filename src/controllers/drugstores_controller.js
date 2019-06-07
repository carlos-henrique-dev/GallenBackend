const Drugstore = require("../models/drugstores_model");
const PostPhoto = require("../models/post_photo_model");

exports.postdrugstorePhoto = async (req, res, next) => {
  const { originalname: name, size, key, location: url = "" } = req.file;

  const postphoto = await PostPhoto.create({ name, size, key, url });
  const newPhoto = { photo_url: postphoto.url, key: postphoto.key };

  Drugstore.update({ _id: req.body.id }, { photo: newPhoto }, { new: true })
    .then(res => {
      console.log("res", res);
    })
    .catch(err => {
      console.log("erro", err);
    });
};

exports.drugstore_getallnightstatus = (req, res, next) => {
  console.log("params", req.params);
  Drugstore.findById(req.params.drugstoreID, "allNigth")
    .then(result => {
      res.status(200).json(result);
    })
    .catch(error => {
      res.status(500).json({
        error: `erro ${error}`
      });
    });
};

exports.drugstore_getall = (req, res, next) => {
  Drugstore.find()
    .exec()
    .then(drugstores_list => {
      const response = {
        count: drugstores_list.length,
        drugstores: drugstores_list
      };
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(500).json({
        error: error
      });
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

// TODO: ver como atualizar uma foto
exports.drugstore_update = (req, res, next) => {
  console.log("body", req.body);
  const id = req.params.drugstoreID;
  const updateOperations = {};
  for (const operations of req.body) {
    updateOperations[operations.propName] = operations.value;
  }
  console.log("update", updateOperations);
  /*   Drugstore.updateOne({ _id: id }, { $set: updateOperations })
    .exec()
    .then(updateResult => {
      if (updateResult) {
        res.status(200).json({
          message: "Drugstore updated sucessfuly"
        });
      } else {
        res.status(404).json({
          message: "Sorry, we couldn't find any register for this id"
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        error: "deu erro" + error
      });
    }); */
};

// params: [ { "propName": "allNight", "value": true/false } ]
exports.drugstore_setAllNight = (req, res, next) => {
  const id = req.params.drugstoreID;
  const updateOperations = {};

  for (const operations of req.body) {
    updateOperations[operations.propName] = operations.value;
  }

  Drugstore.updateOne({ _id: id }, { $set: updateOperations })
    .exec()
    .then(updateResult => {
      if (updateResult) {
        res.status(200).json({
          message: "status changed"
        });
      } else {
        res.status(404).json({
          message: "Sorry, we couldn't find any register for this id "
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: "deu erro" + err
      });
    });
};
