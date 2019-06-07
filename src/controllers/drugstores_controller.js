const Drugstore = require("../models/drugstores_model");

exports.drugstore_delete = (req, res, next) => {};

exports.drugstore_getallnightstatus = (req, res, next) => {
  console.log("params", req.params);
  Drugstore.findById(req.params.drugstoreID, "allNigth")
    .then(result => {
      res.status(200).json(result);
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
