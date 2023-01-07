import React, { useState } from 'react'

const PostForm = () => {

  const [req, setReq] = useState({
    breed: '', 
    name: '',
    birthdate: '',
    url: '',
  });

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReq({
      ...req,
      [event.target.name]: event.target.value
    });
   };

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
      fetch('http://localhost:8080/api/puppies', {
        method: 'POST',
        body: JSON.stringify({
          name: req.name,
          breed: req.breed,
          birthdate: req.birthdate,
        }),
        headers: {
          'Content-Type': 'application/json'
          }
      });
  }

  return (
    <form
      className='postReqForm'
      // style={{display: 'none'}}
      onSubmit={event => submitHandler(event)}>
      <button className='close-btn' type='button'>X</button>
      <h2>Update Puppy</h2>
      <input className='req-input' onChange={changeHandler} type='text' name='name' value={req.name} placeholder='Enter Puppy Name (required)' maxLength={25} autoComplete='off' required={true}/>
      <input className='req-input' onChange={changeHandler} type='text' name='breed' value={req.breed} placeholder='Enter Puppy Breed (required)' maxLength={50} autoComplete='off' required={true}/>
      <input className='req-input' onChange={changeHandler} type='text' name='birthdate' value={req.birthdate} placeholder='Enter birthdate DD-MM-YYYY (required)' maxLength={25} autoComplete='off' required={true}/>
      <div className='btn-div'>
        <button className='submit-btn' type='submit'>Add Puppy</button>
      </div>
    </form>
  )
}

export default PostForm