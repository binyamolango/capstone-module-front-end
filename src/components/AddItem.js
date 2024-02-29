import { TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import Navigation from './Navigation';
import { createDoctor } from '../redux/doctors/doctorsSlice';

const AddItem = () => {
  const [name, setName] = useState('');
  const [doctorType, setDoctorType] = useState('');
  const [address, setAddress] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  return (
    <>
      <div className="flex flex-row h-[100dvh] justify-center md:w-[100dvw] md:flex md:flex-row">
        <div className="md:flex md:w-[15%]">
          <Navigation />
        </div>
        <div className="flex flex-col md:w-5/6 bg-white  text-gray-700 dark:text-gray-800 p-4 w-full md:pr-16 pr-0 gap-8">
          <div className="flex flex-col h-full justify-center items-center  md:items-end gap-12 md:pr-16 pr-0 w-full">
            <div className="title-center">
              <h1 className="md:text-right md:text-slate-800 text-4xl md:text-6xl md:font-bold  font-bold text-center md:font-['Inter'] md:leading-[72px]">Add Doctor</h1>
            </div>
            <form className="flex items-center flex-col w-full md:flex-row justify-center md:pl-4 gap-6" onSubmit={(e) => handleAddDoctor(e)}>
              <div className="flex items-center flex-col w-full md:flex-row justify-center md:pl-4 gap-6">
                <TextField className="w-full" type="text" placeholder="Enter Doctor Name" value={name} onChange={(e) => setName(e.target.value)} required />
                <TextField className="w-full" type="text" placeholder="Enter Specialization" value={doctorType} onChange={(e) => setDoctorType(e.target.value)} required />
                <TextField className="w-full" type="text" placeholder="Enter Address" value={address} onChange={(e) => setAddress(e.target.value)} required />
                <TextField className="w-full" type="text" placeholder="Paste Picture Link" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required />
              </div>
            </form>
            <div>
              <button className="p-4 self-end text-white bg-blue-400 rounded-r-[80px] rounded-l-[80px]" type="submit" onClick={(e) => handleAddDoctor(e)}>Add Doctor</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddItem;
