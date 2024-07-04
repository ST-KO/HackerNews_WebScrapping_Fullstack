import React from "react";
import Home from "./pages/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Articles from "./pages/Articles";

const App: React.FC = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/articles",
      element: <Articles />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
