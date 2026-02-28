import Services from "../models/Services.js";

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

