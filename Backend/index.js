import express from "express";
import cors from "cors";
import "./config/env.js";
import "./config/mongo.js";
import Services from "./models/Services.js";
import Products from './models/Products.js';
import { sendMessage } from "./controllers/resendController.js";
import validateEmail from "./middleware/emailCheck.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/get-services", async (req, res) => {
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
});

app.get("/api/get-products", async (req, res) => {
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
});

app.post("/api/contact", validateEmail, sendMessage)

app.listen(process.env.PORT, () => {
  console.log("Server running on PORT:", process.env.PORT);
});
