import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import IPuppies from './interfaces/IPuppies';
import Home from './routes/Home';
import PuppyGallery from './routes/PuppyGallery';
import Puppy from './routes/Puppy';
import './App.css';

const App = () => {

const [data, setData] = useState<IPuppies[]>([]);

useEffect(() => {
  const fetchData = async () => {
    const response = await fetch('/api/puppies');
    const data = await response.json();
    setData(data);
  };
  fetchData();
},[])

  return (
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/puppies' element={ <PuppyGallery data={data}/>} />
        <Route path='/puppies/:id' element={ <Puppy/>} />
      </Routes> 
    </main>
  );
}

export default App;
