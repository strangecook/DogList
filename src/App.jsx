import React, { useEffect, useState } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './component/layout';
import Home from './Routes/home';
import CreateAccount from './Routes/createAccount';
import Login from './Routes/login'
import { createGlobalStyle } from 'styled-components';
import Loading from './component/Loading-Page';
import AnimatedDog from './component/AnimatedDog';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />
      },
    ]
  },
  
  {
    path: "CreateAccount",
    element: <CreateAccount />
  },
  {
    path: "Login",
    element: <Login />
  }
])

const GlobalStyles = createGlobalStyle`
  background-color: #4caf50;
`

const App = () => {
  const [isLoding, setIsLoading] = useState(true)
  const initializing = async()=>{
    //Wait FireBase information
    setTimeout(() => {
      
      setIsLoading(false)
    }, 2000);
  }
  useEffect(()=>{

    initializing();
  },[]);

  return (
    <>
    <GlobalStyles />
    {
      isLoding ?
      <AnimatedDog/>
      :
      <RouterProvider
        router={router}>
      </RouterProvider>
    }
    </>
  );
};

export default App;
