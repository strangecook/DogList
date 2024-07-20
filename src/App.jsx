import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './component/layout';
import Home from './Routes/home';
import CreateAccount from './Routes/createAccount';
import Login from './Routes/login';
import Usage from './Routes/usage';
import Contact from './Routes/contact';
import Profile from './Routes/Profile';
import ProtectedRoute from './Routes/ProtectedRoute';
import { createGlobalStyle } from 'styled-components';
import BreedDetail from './component/BreedDetail';
import Membership from './Routes/Membership';
import { HelmetProvider } from 'react-helmet-async';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        path: "CreateAccount",
        element: <CreateAccount />
      },
      {
        path: "Login",
        element: <Login />
      },
      {
        path: "breeds/:breedName",
        element: <BreedDetail />
      },
      {
        path: "usage",
        element: <Usage />
      },
      {
        path: "contact",
        element: <Contact />
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        )
      },
      {
        path: "membership",
        element: (
          <ProtectedRoute>
            <Membership />
          </ProtectedRoute>
        )
      }
    ]
  },
]);

const GlobalStyles = createGlobalStyle`
  html, body {
    font-family: 'Nanum Gothic', sans-serif;
    background-color: #f7f7f7;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    overflow-x: hidden;
    width: 100%;
  }
`;

const App = () => {
  return (
    <HelmetProvider>
      <GlobalStyles />
      <RouterProvider router={router} />
    </HelmetProvider>
  );
};

export default App;
