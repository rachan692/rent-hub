import React from 'react'
import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";
import Nav from './components/Nav'
import Home from '../routes/Home';
import Listing from './listings/Listing';
import SinglePage from './Singlepage/SinglePage';
import UserDetail from './components/UserDetail';
import Chat from './components/Chat';

// Root layout component
const RootLayout = () => {
  return (
    <div>
      <Nav />
      <Outlet /> {/* This is where child routes will be rendered */}
    </div>
  )
}

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true, // This means this route matches the parent path exactly
          element: <Home />
        },
        {
          path: 'list',
          element: <Listing/>
        },
        {
          path: ':id',
          element: <SinglePage/>,
        },
        {
          path: 'detail',
          element: <UserDetail/>
        },
        {
          path: 'chat',
          element: <Chat/>
        }
      ]
    }
  ]);
 
  return <RouterProvider router={router} />
}

export default App