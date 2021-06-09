const { Router } = require("express");
const { check } = require("express-validator");

//* Middleware
const { itemDetail, paramsValidate, searchItems } = require('../middlewares');
//* Controllers
const { getSearchArticles, getArticleDetail } = require("../controllers");

//* Routers
const router = Router();

//* Search for articles
router.get(
  "/",
  paramsValidate,
  searchItems,
  getSearchArticles
);

//* Article datail
router.get(
  "/:id",
  paramsValidate,
  itemDetail,
  getArticleDetail
);
module.exports = router;