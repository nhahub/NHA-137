import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { useTranslation } from "react-i18next";

const WhatsAppButton: React.FC = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  // Replace this with your actual business phone number (International format without +)
  // Example: 201000000000 for Egypt
  const phoneNumber = "201234567890";
  const message = encodeURIComponent(
    "Hello! I would like to inquire about your car services."
  );

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-6 z-40 flex items-center justify-center w-14 h-14 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 hover:scale-110 transition-all duration-300 ${
        isRTL ? "left-6" : "right-6"
      }`}
      title="Chat on WhatsApp"
      aria-label="Chat on WhatsApp"
    >
      <FontAwesomeIcon icon={faWhatsapp} className="text-3xl" />

      {/* Pulse Animation Effect */}
      <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-20 animate-ping"></span>
    </a>
  );
};

export default WhatsAppButton;
