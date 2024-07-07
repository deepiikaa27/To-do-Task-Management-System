import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Components/Auth/Login/Login";
import Todo from "./Components/Todo-dashboard/Todo";
import Home from "./Components/Home/Home";

const Layout = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
      <Route path="/todo" element={<Todo />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default Layout;
