import React from 'react';
import { Link } from 'react-router-dom';
import IPuppies from '../interfaces/IPuppies';
import '.././styles/puppygallery.css'

interface PuppiesProps {
  data : Array<IPuppies>,
}

const PuppyGallery = ({ data } : PuppiesProps ) => {

  const deletePuppy = async (id:number | undefined) => {
    await fetch(`/api/puppies/${id}`, { method: 'DELETE' })
  };

  return (
      <section className='gallery-container'>
        <div className='text-container'>
          <h1>Welcome to our Puppy Gallery</h1>
          <p>Hover over the pictures to view more puppy details!</p>
          <p>Click the button below to add a new puppy to the gallery</p>
          <Link to={'/postform'}>
            <button className='add-btn'>Add Puppy</button>
          </Link>
        </div>
        <section className='puppies-container'>
          {data?.map((obj, index) => {
          return (
            <article className='puppy-article' key={index}>
              <div className='puppy-article-inner'>
                <div className='puppy-article-front'>
                  <img className='puppy-img' src={`${obj.url}`} alt={`${obj.breed} to appear`}/>
                </div>
                <div className='puppy-article-back'>
                  <div>
                    <p className='list-item'><b>Puppy id: </b>{` ${obj.id}`}</p>
                    <p className='list-item'><b>Name:</b>{` ${obj.name}`}</p>
                    <p className='list-item'><b>Breed:</b>{` ${obj.breed}`}</p>
                    <p className='list-item'><b>Date of Birth:</b>{` ${obj.birthdate}`}</p>
                  </div>
                  <div className='btn-div'>
                  <Link to={`/puppies/${obj.id}`}>
                    <button className='edit-btn'>Edit Details</button>
                  </Link>
                  <button className='delete-btn' onClick={() => {
                    deletePuppy(obj.id);
                    window.location.reload();
                    alert(`${obj.name} (${obj.breed}) has been deleted from the Gallery`)
                    }}>Delete Puppy</button>
                </div>
                </div>
              </div>
            </article>
          )
          })}
        </section>
      </section>
  )
}

export default PuppyGallery