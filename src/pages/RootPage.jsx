import React from 'react';
import { Outlet } from 'react-router-dom';
import Search from '../components/search/Search';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function RootPage() {
  return (
    <>
      <Search />
      <QueryClientProvider client={queryClient}>
        <Outlet />
      </QueryClientProvider>
    </>
  );
}
