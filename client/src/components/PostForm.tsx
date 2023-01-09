import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import IPuppies from '.././interfaces/IPuppies';
import '.././styles/forms.css';

interface PostFormProps {
  setData: (param: Array<IPuppies>) => void,
}

const PostForm = ({setData}: PostFormProps) => {

  const [puppy, setPuppy] = useState({
    breed: '', 
    name: '',
    birthdate: '',
    url: '',
  });

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPuppy({
      ...puppy,
      [event.target.name]: event.target.value
    });
   };

  const postHandler = (event: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>) => {
    const fetchData = async () => {
      const response = await fetch('/api/puppies', {
        method: 'POST',
        body: JSON.stringify(puppy),
        headers: {
          'Content-Type': 'application/json'
          }
      });
    const data = await response.json();
    setData(data);
  }
  fetchData();
  alert(`${puppy.name} (${puppy.breed}) has been added to the Gallery`)
}

  return (
    <section className='post-form-container'>
      <h1>Complete the form below to add a new puppy to our Gallery!</h1>
      <form
        className='post-form'
        onSubmit={event => postHandler(event)}
        >
        <div className='close-btn-div'>
          <Link to={'/puppies'}>
            <button className='close-btn' type='button'>X</button>
          </Link>
        </div>
        <h2>ADD A NEW PUPPY</h2>
        <p className='form-text'>* all fields must be populated</p>
        <input className='post-input' onChange={changeHandler} type='text' name='name' value={puppy.name} placeholder='*Enter Puppy Name' maxLength={30} autoComplete='off' required={true}/>
        <input className='post-input' onChange={changeHandler} type='text' name='breed' value={puppy.breed} placeholder='*Enter Puppy Breed' maxLength={30} autoComplete='off' required={true}/>
        <input className='post-input' onChange={changeHandler} type='text' name='birthdate' value={puppy.birthdate} placeholder='*Enter birthdate DD-MM-YYYY' maxLength={30} autoComplete='off' required={true}/>
        <input className='post-input' onChange={changeHandler} type='text' name='url' value={puppy.url} placeholder='*Enter Image URL' autoComplete='off' required={true}/>
        <div className='submit-btn-div'>
          <Link to={'/puppies'}>
            <button className='add-btn' type='submit'
            onClick={event => postHandler(event)}>Add Puppy</button>
          </Link>
        </div>
      </form>
    </section>
  )
}

export default PostForm