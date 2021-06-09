const itemDeatailMiddleware = require('./item.middleware');
const searchItemsMiddleware = require('./searchItems.middleware');
const validateParamsMiddleware = require('./validateParams.middleware');

module.exports = {
  ...itemDeatailMiddleware,
  ...searchItemsMiddleware,
  ...validateParamsMiddleware,
}