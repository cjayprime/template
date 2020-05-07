
import React from 'react';
import { BeatLoader  } from 'react-spinners';


const Loader = ({status, style, color}) => {
  return (
    <BeatLoader color={ '#fff' || 'var(--first)'} loading={status} />
  );
};

export default Loader;
