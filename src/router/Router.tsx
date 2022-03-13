import React, { useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import Login from "../pages/login/Login";
import Books from "../pages/books/Books"
import { AuthContext } from "../services/AuthContext";

const PrivateRoute = ({ children }: {children: JSX.Element}) => {
  const { isAuthenticated } = useContext(AuthContext);
  const location = useLocation();

  if(!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

const Router = () => {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/books"
          element={
            <PrivateRoute>
              <Books />
            </PrivateRoute>
          }
        />
        <Route path="/*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
};

export default Router;