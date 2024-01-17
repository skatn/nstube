import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Root from './pages/Root';
import VideoList from './pages/VideoList';
import Watch from './pages/Watch';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: <VideoList />,
      },
      {
        path: '/watch',
        element: <Watch />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
