import Products from "../models/Products";
import Services from "../models/Services";

export const getServices = async (req, res) => {
  try {
    const services = await Services.find({});
    res.status(200).json(services)
  } catch (error) {
    console.log(error.message)
    res.status(400).json({
        success : false,
        error : error.message
    })
  }
}

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