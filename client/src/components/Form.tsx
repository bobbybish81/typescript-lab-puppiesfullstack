import React from 'react';
import IPuppies from '../interfaces/interface';

interface PuppiesProps {
  data : Array<IPuppies>;
  formHandler(event: React.MouseEvent<HTMLInputElement>) : void;
}

const Form = ({data, formHandler} : PuppiesProps) => {
  return (
    <section>
      <div className="post-it" id="post" onClick={formHandler}>NEW</div>
      <div className="post-it" id="update" onClick={formHandler}>UPDATE</div>
      <div className="post-it" id="delete" onClick={formHandler}>DELETE</div>
    </section>
  )
}

export default Form