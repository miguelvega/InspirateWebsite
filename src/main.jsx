import React from "react";
import ReactDOM from "react-dom/client";

import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { Default } from "./pages/Default/Default";
import { Header } from "./componentes/Header/Header";
import { Footer } from "./componentes/Footer/Footer";

import { Login } from "./pages/Auth/Login";

import { NavBarSuperior } from "./componentes/Menus/NavBarSuperior";
import { Eventos } from "./pages/Eventos/Eventos";
import { Igirl } from "./pages/Igirl/Igirl";
import "./index.css";
import { OvpgsMain } from "./pages/Ovpgs/OvpgsMain";
import { InscripcionOvpgs } from "./pages/Ovpgs/InscripcionOvpgs";
import { TestOVPG } from "./pages/Ovpgs/TestOVPG";
import { OpenDay } from "./pages/OpenDay/OpenDay";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Default />,
  },
  {
    path: "/home",
    element: <NavBarSuperior></NavBarSuperior>,

    children: [
      {
        path: "/home/OpenDay",
        element: <OpenDay />,
      },
      {
        path: "/home/inicio",
        element: <Home />,
      },
      {
        path: "/home/eventos",
        element: <Eventos />,
      },
      {
        path: "/home/ovpgs",
        element: <OvpgsMain />,
      },
      {
        path: "/home/ovpgs-inscripcion",
        element: <InscripcionOvpgs />,
      },
      {
        path: "/home/test",
        element: <TestOVPG />,
      },
      {
        path: "/home/login",
        element: <Login />,
      },
      {
        path: "/home/igirl",
        element: <Igirl />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Header />
    <RouterProvider router={router} />
    <Footer />
  </React.StrictMode>
);
