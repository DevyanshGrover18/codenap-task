import Admin from "../models/Admin.js";
import jwt from "jsonwebtoken";

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

export const getAdmin = async (req, res) => {
  try {
    const adminData = await Admin.find({});
    res.status(200).json({ success: true, data: adminData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log("Body received:", req.body); // ← add

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Fill all fields" });
    }

    const existingAdmin = await Admin.findOne({ email });
    console.log("Existing admin:", existingAdmin); // ← add

    if (existingAdmin) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const newAdmin = new Admin({ name, email, password });
    console.log("New admin object:", newAdmin); // ← add

    await newAdmin.save();
    console.log("Saved successfully"); // ← add

    const token = generateToken(newAdmin._id);

    res.status(201).json({
      message: "User created successfully",
      token,
      user: {
        id: newAdmin._id,
        name: newAdmin.name,
        email: newAdmin.email,
      },
    });
  } catch (error) {
    console.log("SIGNUP ERROR:", error); // ← add
    res
      .status(500)
      .json({ message: "Server error during signup", error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Fill all fields" });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(admin._id);

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error during login", error: error.message });
  }
};
