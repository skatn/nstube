import React from 'react';
import { Outlet } from 'react-router-dom';
import Search from '../components/search/Search';

export default function Root() {
  return (
    <div>
      <Search />
      <Outlet />
    </div>
  );
}
