const { response } = require("express");
const { itemAxios, getItem, logSave } = require("../helpers");

//* Generate Item List
const searchItems = async (req, res = response, next) => {
  const { q } = req.query;
  if(!q){
    logSave(400, msg, 'itemDetail');
    return res.status(400).json({message: 'The query parameter q, is not defined'});
  }
  try {
    const author = { name: "Andrés Camilo", lasname: "Naranjo Vargas" };

    const result = await getItem(`/sites/MLA/search?q=${q}`);

    const {
      data: { results, filters },
    } = result;

    const { values } = filters[0];

    req.search = {
      author,
      categories: categories(values[0].path_from_root),
      items: items(results),
    };
    next();
  } catch ({ response: { data } }) {
    logSave(data.status, data, 'searchItems');
    return res.status(data.status).json({ errors: data });
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
      pitcture: thumbnail,
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
