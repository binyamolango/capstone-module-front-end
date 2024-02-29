import React from 'react';
import Navigation from './Navigation';

const DeleteItem = () => (
  <>
    <div className="flex flex-row h-[100dvh] justify-center md:w-[100dvw] md:flex md:flex-row">
      <div className="md:flex md:w-[15%]">
        <Navigation />
      </div>
      <div className=" flex flex-col md:w-5/6 bg-white  text-gray-700 dark:text-gray-800 p-4 w-full md:pr-16 pr-0 gap-8">
        <h1 className="text-center">Under Construction</h1>
      </div>
    </div>
  </>
);

export default DeleteItem;
