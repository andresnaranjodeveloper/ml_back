const itemAxios = require('./itemAxios');
const logs = require('./log');
module.exports = {
  ...itemAxios,
  ...logs
}