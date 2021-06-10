const { response } = require("express");
const { itemAxios, getItem, logSave } = require("../helpers");

//* extract the necessary data from the article
const items = (results) => {
  let article = {
    id: results.id,
    title: results.title,
    price: {
      currency: results.currency_id,
      decimals: results.price,
    },
    picture: results.pictures[0].url,
    condition: results.condition,
    sold_quantity: results.sold_quantity,
    free_shipping: results.shipping.free_shipping,
  };
  
  return article;
}

//* Generate article summary
const itemDetail = async (req, res = response, next) => {
  const { id } = req.params;
  if(!id){
    const message = 'The parameter id, is not defined'
    logSave(400, msg, 'itemDetail');
    return res.status(400).json({message});
  }
  try {
    const author = { name: "Andrés Camilo", lastname: "Naranjo Vargas" };

    const item = await getItem(`/items/${id}`);

    let itemInfo = items(item.data);

    const itemDescription = await getItem(`/items/${id}/description`);
    
    const { data: { plain_text } } = itemDescription;

    itemInfo.description = plain_text;

    req.item = {
      author,
      itemInfo
    };
    next();
  } catch (error) {
    logSave(404, error.response, 'itemDetail');
    return res.status(404).json({ errors: error.response });
  }
}

module.exports = {
  itemDetail
};