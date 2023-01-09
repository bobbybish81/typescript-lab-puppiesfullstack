import React from 'react';
import { Link } from 'react-router-dom';
import '.././styles/error.css';

const Error = () => {
  return (
    <section className="error-container">
      <h1>Sorry! Page Not found</h1>
      <Link to={'/'}>
        <p>Return to Homepage</p>
      </Link>
    </section>
  )
}

export default Error