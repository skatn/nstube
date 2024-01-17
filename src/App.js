import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootPage from './pages/RootPage';
import VideoListPage from './pages/VideoListPage';
import WatchPage from './pages/WatchPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootPage />,
    children: [
      {
        index: true,
        element: <VideoListPage />,
      },
      {
        path: '/watch',
        element: <WatchPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
