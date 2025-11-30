import "./index.css";
import { Routes, Route } from "react-router";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import TopBar from "./Components/TopBar";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer/Footer";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Services from "./Pages/Services";
import Error404 from "./Pages/Error404";
import Blog from "./Pages/Blog";
import BlogSingle from "./Pages/BlogSingle";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import MakeAppointment from "./Pages/MakeAppointment";
import Dashboard from "./Pages/Dashboard";
import WhatsAppButton from "./Components/WhatsAppButton";
import { Toaster } from "react-hot-toast";

function App() {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  // Update document direction and language when language changes
  useEffect(() => {
    const currentLang = i18n.language;
    const isRTL = currentLang === "ar";

    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.lang = currentLang;
    document.documentElement.setAttribute("class", isRTL ? "rtl" : "ltr");

    // Ensure language is persisted
    localStorage.setItem("i18nextLng", currentLang);
  }, [i18n.language]);

  return (
    <div className={`min-h-screen ${isRTL ? "rtl" : "ltr"}`}>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <WhatsAppButton />
      <TopBar />
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogSingle />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/appointment" element={<MakeAppointment />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
