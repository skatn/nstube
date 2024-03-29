import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootPage from './pages/RootPage';
import HomePage from './pages/home/HomePage';
import WatchPage from './pages/watch/WatchPage';
import SearchPage from './pages/search/SearchPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: '/watch',
        element: <WatchPage />,
      },
      {
        path: '/results',
        element: <SearchPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
