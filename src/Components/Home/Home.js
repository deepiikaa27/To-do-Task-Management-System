import React from "react";
import "../Home/Home.css";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
const Home = () => {
  const naviagte = useNavigate();

  return (
    <div className="home-main">
      <div className="bg-blur">
        <div className="home-text">
          <Typography variant="h4" style={{ color: "lightgray" }}>
            Welcome to
          </Typography>
          <Typography variant="h3" style={{ color: "#fff" }}>
            TMS - Task Management System
          </Typography>
          <button className="start-btn" onClick={() => naviagte("/login")}>
            Get started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
