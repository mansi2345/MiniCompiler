import React from "react";
import image from "../assets/image.png";
import "./LogoImage.css"; // optional for styling

const LogoImage = ({ width = "150px", alt = "Compiler Logo" }) => {
  return <img src={image} alt={alt} width={width} className="logo-img" />;
};

export default LogoImage;
