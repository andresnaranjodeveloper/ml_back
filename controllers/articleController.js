const { response } = require("express");

//* Search for articles
const getSearchArticles = async (req, res = response, next) => {
  res.json(req.search);
  next();
}
//* Article datail
const getArticleDetail = async (req, res = response, next) => {
  res.json(req.item);
  next();
}

module.exports = {
  getSearchArticles,
  getArticleDetail
}