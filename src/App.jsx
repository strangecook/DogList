import React, { useEffect, useState } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './component/layout';
import Home from './Routes/home';
import CreateAccount from './Routes/createAccount';
import Login from './Routes/login';
import { createGlobalStyle } from 'styled-components';
import AnimatedDog from './component/AnimatedDog';
import { auth } from './firebase';
import BreedDetail from './component/BreedDetail';

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
      }
    ]
  },
]);

const GlobalStyles = createGlobalStyle`
  body {
    font-family: 'Nanum Gothic', sans-serif;
    background-color: #f7f7f7;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  const initializing = async () => {
    await auth.authStateReady();
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  useEffect(() => {
    initializing();
  }, []);

  return (
    <>
      <GlobalStyles />
      {isLoading ? (
        <AnimatedDog />
      ) : (
        <RouterProvider router={router} />
      )}
    </>
  );
};

export default App;
