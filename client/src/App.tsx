import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import IPuppies from './interfaces/IPuppies';
import Home from './components/Home';
import PostForm from './components/PostForm';
import UpdateForm from './components/UpdateForm';
import PuppyGallery from './components/PuppyGallery';
import Error from './components/Error';
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
        <Route path="/postform" element={<PostForm setData={setData}/>} />
        <Route path='/puppies' element={ <PuppyGallery data={data}/>} />
        <Route path='/puppies/:id' element={ <UpdateForm data={data} setData={setData}/>} />
        <Route path="*" element={<Error/>}/>
      </Routes> 
    </main>
  );
}

export default App;
