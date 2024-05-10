import React from 'react';
import AnimalDaterpart from './animalDaterpart';
import Descriotionpage from './Descriptionpage';
import styled from 'styled-components';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './component/layout';
import Home from './Routes/home';
import Profile from './Routes/profile';


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
    }
  ]
  }  
])

const App = () => {

  const MainCoverdiv = styled.div`
  margin: 0;
  width: 100vw;
  background-position: center;
`;


  return (
    <>
    <RouterProvider router={router}>

    </RouterProvider>
    <MainCoverdiv>
      <Descriotionpage />
      <AnimalDaterpart />
    </MainCoverdiv>
    </>
  );
};

export default App;
