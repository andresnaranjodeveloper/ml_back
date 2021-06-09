const { response } = require("express");
const { logSave } = require("../helpers");

//* Validate if the necessary parameters are being collected
const paramsValidate = async (req, res = response, next) => {
  if (!Object.keys(req.query).length) {
    if (!Object.keys(req.params).length) {
      errors = [
        {
          message: "If you want to search for an article, you must consult the path",
          path: "/api/items?q=query",
        },
        {
          message: "If you want to see the description of an item, you should check the path",
          path: "/api/items/:id",
        },
      ];
      
      logSave(400, errors, 'paramsValidate');
      return res.status(400).json({errors});
    }
  }
  next();
};

module.exports = {
  paramsValidate,
};
