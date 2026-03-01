import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProductsAndServices from "./pages/ProductsAndServices";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./utils/ScrollToTop";
import AdminPage from "./pages/AdminPage";
import ProtectedRoute from './utils/ProtectedRoute'
import Auth from './pages/Auth'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/products" element={<ProductsAndServices />} />
          <Route path="/login" element={<Auth />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
