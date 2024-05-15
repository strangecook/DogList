import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './component/layout';
import Home from './Routes/home';
import Profile from './Routes/profile';
import Login from './Routes/login'


const router = createBrowserRouter([
  {
    path:"/",
    element: <Layout />,
    children: [
      {
        path: "",
        element:<Home/>
    },
    {
      path: "profile",
      element:<Profile/>
    },
    {
      path: "Login",
      element:<Login/>
    }
  ]
  }  
])

const App = () => {

  return (
    <>
      <RouterProvider 
      router={router}>
      </RouterProvider>
    </>
  );
};

export default App;
