import React, { useState, useLayoutEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import IPuppies from '.././interfaces/IPuppies';
import '.././styles/forms.css';

interface UpdateFormProps {
  data : Array<IPuppies>,
  setData: (param: Array<IPuppies> ) => void,
}

const UpdateForm = ({data, setData}: UpdateFormProps) => {

  useLayoutEffect(() => {
    window.scrollTo(0,0)
  })

  const navigate = useNavigate();

  let { id } = useParams();
  const index: number = data?.findIndex(obj => obj.id === Number(id))

  const [puppy, setPuppy] = useState({
    breed: data[index].breed, 
    name: data[index].name, 
    birthdate: data[index].birthdate,
    url: data[index].url,
  });

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPuppy({
      ...puppy,
      [event.target.name]: event.target.value
    });
   };

  const updateHandler = (event: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>) => {
    const fetchData = async () => {
      const response = await fetch(`/api/puppies/${id}`, {
        method: 'PUT',
        body: JSON.stringify(puppy),
        headers: {
          'Content-Type': 'application/json'
          }
      });
    const newData = await response.json();
    setData(newData);
  }
  fetchData();
  navigate('/puppies');
  window.location.reload();
  alert(`Changes added to Gallery`)
}

  return (
    <section className='update-form-container'>
      <h1>Edit the form below to update puppy details</h1>
      {data?.filter(obj => obj.id === Number(id))
        .map((puppy, index) => {
          return (
            <form
              key={index}
              className='update-form'
              onSubmit={event => updateHandler(event)}
              >
              <div className='close-btn-div'>
                <Link to={'/puppies'}>
                  <button className='close-btn' type='button'>X</button>
                </Link>
              </div>
              <h2>{`UPDATE ${puppy.name.toUpperCase()}`}</h2>
              <p className='form-text'>*edit relevant field(s) below</p>
              <div className='form-div'>
                <div className='img-div'>
                  <img className='puppy-img' src={`${puppy.url}`} alt={`${puppy.breed} to appear`}/>
                </div>
                <div className='input-div'>
                  <label>Name:</label>
                  <input className='update-input' onChange={changeHandler} type='text' name='name' placeholder={puppy.name} maxLength={30} autoComplete='off' required={true}/>
                  <label>Breed:</label>
                  <input className='update-input' onChange={changeHandler} type='text' name='breed' placeholder={puppy.breed} maxLength={30} autoComplete='off' required={true}/>
                  <label>Birthdate:</label>
                  <input className='update-input' onChange={changeHandler} type='text' name='birthdate' placeholder={puppy.birthdate} maxLength={30} autoComplete='off' required={true}/>
                  <label>Url:</label>
                  <input className='update-input' onChange={changeHandler} type='text' name='url' placeholder={puppy.url} autoComplete='off' required={true}/>
                  <div className='submit-btn-div'>
                    <Link to={'/puppies'}>
                      <button className='add-btn' type='submit'
                      onClick={event => updateHandler(event)}>Save Changes</button>
                    </Link>
                  </div>
                </div>
              </div>
            </form>
        )}
      )} 
    </section>
  )
}

export default UpdateForm