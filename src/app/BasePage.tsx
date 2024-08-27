import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';

const BasePage = () => {

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className='flex min-h-screen h-screen w-full p-10 flex-col'>
        <Outlet />
      </div>
    </Suspense>
  );
};

export default BasePage;
