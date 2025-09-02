import React, { Suspense } from 'react';
import { Home } from '@/screens/Home';

const HomePage = () => {
  return (
    <Suspense>
      <Home />
    </Suspense>
  );
};

export default HomePage;
