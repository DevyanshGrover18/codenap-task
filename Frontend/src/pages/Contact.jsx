import React, { useState } from "react";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    alert(data.message || data.error);

    setForm({ name: "", company: "", phone: "", email: "", message: "" });
  };

  return (
    <section className="bg-gray-100 min-h-screen">
      {/* Banner */}
      <div className="relative h-48 sm:h-64 md:h-80">
        <img
          src="https://trijal.com/assets/images/banners/contact.jpg"
          alt="contact"
          className="w-full h-full object-cover"
        />
        <h1 className="absolute inset-0 flex items-center justify-center text-2xl sm:text-3xl md:text-4xl text-white font-semibold text_shadow">
          CONTACT
        </h1>
      </div>

      {/* Intro Text */}
      <p className="text-center px-4 sm:px-16 md:px-32 lg:px-64 my-6 text-slate-700 text-sm sm:text-base leading-7">
        Welcome to our Help Centre - your go-to resource for answers, assistance,
        and guidance. Discover comprehensive support, FAQs, and expert insights to
        ensure a seamless experience with our products and services.
      </p>

      {/* Cards Grid */}
      <div className="max-w-6xl mx-auto py-4 px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-8 pb-12">
        
        {/* Contact Info */}
        <div className="bg-white p-6 sm:p-8 rounded shadow">
          <h3 className="text-red-600 mb-3 font-semibold">Get in touch</h3>
          <h2 className="text-lg sm:text-xl font-semibold mb-1">Contact our sales</h2>
          <div className="w-32 h-0.5 bg-red-600 mb-6" />
          <p className="mb-2 underline text-slate-500 cursor-pointer hover:text-red-400 text-sm sm:text-base">
            sales@trijal.com
          </p>
          <p className="mb-2 underline text-slate-500 cursor-pointer hover:text-red-400 text-sm sm:text-base">
            contact@trijal.com
          </p>
          <p className="mb-2 underline text-slate-500 cursor-pointer hover:text-red-400 text-sm sm:text-base">
            +91 8588887862
          </p>
          <p className="underline text-slate-500 cursor-pointer hover:text-red-400 text-sm sm:text-base">
            +91 8588887860
          </p>
        </div>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 sm:p-8 rounded shadow space-y-4"
        >
          <h3 className="text-red-600 font-semibold">Send us a message</h3>
          <h2 className="text-lg sm:text-xl font-semibold mb-1">Contact our sales</h2>
          <div className="w-32 h-0.5 bg-red-600 mb-6" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Name"
              className="p-2 border rounded bg-gray-200 text-sm w-full"
              required
            />
            <input
              name="company"
              value={form.company}
              onChange={handleChange}
              placeholder="Company"
              className="p-2 border rounded bg-gray-200 text-sm w-full"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="p-2 border rounded bg-gray-200 text-sm w-full"
            />
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="p-2 border rounded bg-gray-200 text-sm w-full"
              required
            />
          </div>

          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Message"
            rows="4"
            className="w-full p-2 border rounded bg-gray-200 text-sm"
            required
          />

          <button className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 text-sm sm:text-base">
            Send
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;