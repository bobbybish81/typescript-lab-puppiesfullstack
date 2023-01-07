import React from 'react';
import { Link } from 'react-router-dom';
import '.././styles/home.css';

const Home = () => {
  return (
    <section className='home-container'>
      <h1>We love Puppies!</h1>
      <p>We love Puppies and everything about them! This is a site for puppy lovers who enjoy nothing more than viewing pictures of adorable puppies!</p>
      <Link to={'/puppies'}>Click to Enter Site</Link>
    </section>
  )
}

export default Home