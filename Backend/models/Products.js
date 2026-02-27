import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title : String,
    desc : String,
    img : String
})

export default mongoose.model("Products", productSchema)