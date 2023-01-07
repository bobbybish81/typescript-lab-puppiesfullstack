import React from 'react';
import { Link } from 'react-router-dom';
import PostForm from '../components/PostForm';
import IPuppies from '../interfaces/IPuppies';
import '.././styles/puppygallery.css'

interface PuppiesProps {
  data : Array<IPuppies>
}

const deletePuppy = async (id:number | undefined) => {
  await fetch(`/api/puppies/${id}`, { method: "DELETE" })
};

const PuppyGallery = ({ data } : PuppiesProps ) => {
  return (
    <>
      <section className='gallery-container'>
        <div className='text-container'>
          <h1>Welcome to our Puppy Gallery</h1>
          <p>Hover over the pictures to view more puppy details!</p>
          <p>Click the button below to add a new puppy to the gallery</p>
          <button className='add-btn'>Add Puppy</button>
        </div>
        <section className='puppies-container'>
          {data?.map((obj, index) => {
          return (
            <article className='puppy-article' key={index}>
              <img className='puppy-img' src={`${obj.url}`} alt={`${obj.breed} to appear`}/>
              {/* <p>{`id:${obj.id} Name:${obj.name} Breed:${obj.breed} DoB:${obj.birthdate}` }</p> */}
              <div className='btn-div'>
                <button className='edit-btn'>
                  <Link to={`/puppies/${obj.id}`}>Edit Details</Link>
                </button>
                <button className='delete-btn' onClick={() => deletePuppy(obj.id)}>Delete Puppy</button>
              </div>
            </article>
          )
          })}
        </section>
      </section>
      {/* <PostForm/> */}
    </>
  )
}

export default PuppyGallery