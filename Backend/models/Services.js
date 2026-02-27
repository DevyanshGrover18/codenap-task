import mongoose from "mongoose";

const servicesSchema = new mongoose.Schema({
    title : String,
    desc : String,
    img : String
})

export default mongoose.model("Services", servicesSchema)