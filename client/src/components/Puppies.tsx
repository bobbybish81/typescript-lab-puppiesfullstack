import React from 'react';
import IPuppies from '../interfaces/interface';

interface PuppiesProps {
  data : Array<IPuppies>
}

const Puppies = ({ data } : PuppiesProps ) => {
  return (
    <section>
       {data?.map((obj, index) => {
        return (
          <div key={index}>{`id:${obj.id} Name:${obj.name} Breed:${obj.breed} DoB:${obj.birthdate}` }</div>
        )
       })}
    </section>
  )
}

export default Puppies