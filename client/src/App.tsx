import React, { useEffect, useState } from 'react';
import IPuppies from './interfaces/interface';
import Form from './components/Form';
import Puppies from './components/Puppies';
import './App.css';

const App = () => {

const [data, setData] = useState<IPuppies[]>([]);

const formHandler = () => {

};

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
      <Form data={data} formHandler={formHandler}/>
      <Puppies data={data}/>
    </main>
  );
}

export default App;
