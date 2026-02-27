import mongoose, { mongo, trusted } from 'mongoose';

const contactSchema = new mongoose.Schema({
    name : String,
    company : String,
    phone : Number,
    email : String,
    message : String
},
{timestamps : trusted}
)

export default mongoose.model("Contact", contactSchema)