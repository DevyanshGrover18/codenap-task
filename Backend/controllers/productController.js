import Products from '../models/Products.js';

export const getProducts = async (req, res) => {
  try {
    const products = await Products.find({});
    res.status(200).json(products)
  } catch (error) {
    console.log(error.message)
    res.status(400).json({
        success : false,
        error : error.message
    })
  }
}