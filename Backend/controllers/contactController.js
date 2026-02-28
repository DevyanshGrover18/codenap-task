import Contact from "../models/Contact.js";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendMessage = async (req, res) => {
  try {
    const { name, company, phone, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    await Contact.create({
      name,
      company,
      phone,
      email,
      message,
    });

    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "devyansh.grover348@gmail.com",
      subject: "New Contact Form Submission",
      html: `
        <h3>New Message</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Company:</strong> ${company}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    console.log("Resend response:", data);
    console.log("Resend error:", error);

    res.status(200).json({ success: true, message: "Message sent!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
