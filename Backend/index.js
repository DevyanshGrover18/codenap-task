import express from "express";
import cors from "cors";
import "./config/env.js";
import "./config/mongo.js";
import ContactRouter from "./routes/contactRouter.js";
import ProductRouter from "./routes/productRouter.js";
import ServiceRouter from "./routes/serviceRouter.js";
import AuthRouter from "./routes/authRouter.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/contact', ContactRouter)
app.use('/api/products', ProductRouter)
app.use('/api/services', ServiceRouter)
app.use('/api/auth', AuthRouter)


app.listen(process.env.PORT, () => {
  console.log("Server running on PORT:", process.env.PORT);
});
