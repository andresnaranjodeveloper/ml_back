const { response } = require("express");
const { itemAxios, getItem, logSave } = require("../helpers");

//* Generate Item List
const searchItems = async (req, res = response, next) => {
  const { q } = req.query;
  if(!q){
    const message = 'The query parameter q, is not defined';
    logSave(400, message, 'itemDetail');
    return res.status(400).json({message});
  }
  try {
    const author = { name: "Andrés Camilo", lastname: "Naranjo Vargas" };

    const result = await itemAxios.get(`/sites/MLA/search?q=${q}`);

    const {
      results, filters
    } = result.data;

    let categoryFilter = filters.length > 0 ? filters[0].values[0].path_from_root : [];

    req.search = {
      author,
      categories: categories(categoryFilter),
      items: items(results),
    };
    next();
  } catch (error) {
    logSave(404, error.response, 'searchItems');
    return res.status(404).json({ errors: error.response });
  }
};

//* extract the necessary data from the articles
const items = (results) => {
  let articles = [];
  results.map((data) => {
    const {
      id,
      title,
      currency_id,
      price,
      prices: { prices },
      thumbnail,
      condition,
      shipping: { free_shipping },
    } = data;
    const filter = {
      id,
      title,
      price: {
        currency: currency_id,
        amount: prices[0].amount,
        decimals: price,
      },
      picture: thumbnail,
      condition,
      free_shipping,
    };
    articles.push(filter);
  });
  return articles;
};

//* extract the necessary data from the article
const categories = (data) => {
  let path_root = [];
  data.map((category) => {
    const { name } = category;
    path_root.push(name);
  });
  return path_root;
};

//* extract the categories of the articles
module.exports = {
  searchItems,
};
