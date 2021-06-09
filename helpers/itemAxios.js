const axios = require("axios");

//* Base URL
const itemAxios = axios.create({
  baseURL: process.env.PATH_API_ML
});

//* axios requests
const getItem = async (path) => {
  const item = await itemAxios.get(path);
  return item;
}

module.exports = {
  itemAxios,
  getItem
};