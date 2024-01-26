import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
//import "./index.css";
import TechnicalIndex from "./TechnicalIndex.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // errorElement: <ErrorPage />,
  },
  {
    path: "/comparestocks",
    element: <p>testing</p>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <App />
  </>
);
