import React from 'react';

function DisplayComponent(props) {
  const h = () => {
     if(props.time.h === 0){
       return '';
     }else {
       return <span>{(props.time.h >= 10)? props.time.h : "0"+ props.time.h}</span>;
     }
  }
  return (
    <div className='font-bold'>
       {h()}&nbsp;&nbsp;
       <span>{`${(props.time.m >= 10)? props.time.m : "0"+ props.time.m} min `}</span>&nbsp;:&nbsp;
       <span>{`${(props.time.s >= 10)? props.time.s : "0"+ props.time.s} sec `}</span>&nbsp;:&nbsp;
       <span>{`${(props.time.ms >= 10)? props.time.ms : "0"+ props.time.ms} ms `}</span>
    </div>
  );
}

export default DisplayComponent;