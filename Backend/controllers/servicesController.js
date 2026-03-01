import Services from "../models/Services.js";

export const getServices = async (req, res) => {
  try {
    const services = await Services.find({});
    res.status(200).json(services);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

export const addService = async (req, res) => {
  try {
    const { title, desc, img } = req.body;

    if (!title || !desc) return res.status(400).json({
      success: false,
      message: "Fill Title and Description",
    });

    const service = await Services.create({ title, desc, img });

    res.status(201).json(service);
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, desc, img } = req.body;

    const service = await Services.findByIdAndUpdate(
      id,
      { title, desc, img },
      { new: true, runValidators: true }
    );

    if (!service) return res.status(404).json({
      success: false,
      message: "Service not found",
    });

    res.status(200).json(service);
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteService = async (req, res) => {
  try {
    const { id } = req.params;

    const service = await Services.findByIdAndDelete(id);

    if (!service) return res.status(404).json({
      success: false,
      message: "Service not found",
    });

    res.status(200).json({
      success: true,
      message: "Service deleted",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};