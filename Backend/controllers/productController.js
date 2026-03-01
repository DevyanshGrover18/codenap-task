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

export const addProduct = async (req, res) => {
  try {
    const { title, desc, img } = req.body;

    if (!title || !desc) return res.status(400).json({
      success: false,
      message: "Fill Title and Description"
    })

    const product = await Products.create({
      title,
      desc,
      img
    })

    res.status(201).json(product)
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
}

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, desc, img } = req.body;

    const product = await Products.findByIdAndUpdate(
      id,
      { title, desc, img },
      { new: true, runValidators: true }
    );

    if (!product) return res.status(404).json({
      success: false,
      message: "Product not found"
    })

    res.status(200).json(product)
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
}

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Products.findByIdAndDelete(id);

    if (!product) return res.status(404).json({
      success: false,
      message: "Product not found"
    })

    res.status(200).json({
      success: true,
      message: "Product deleted"
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
}