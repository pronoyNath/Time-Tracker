import React from 'react';

function BtnComponent(props) {
  return (
    <div>
      {(props.status === 0)? 
        <button className="stopwatch-btn stopwatch-btn-gre   hover:ease-in-out duration-1000 hover:delay-150 hover:-skew-y-6 hover:origin-top-left   btn btn-lg text-white hover:bg-green-600 bg-green-900"
        onClick={props.start}>Start</button> : ""
      }

      {(props.status === 1)? 
        <div>
          <button className="stopwatch-btn stopwatch-btn-red    hover:ease-in-out duration-1000 hover:delay-150 hover:-skew-y-6 hover:origin-top-left   btn btn-lg text-white hover:bg-green-600 bg-green-900"
                  onClick={props.stop}>Stop</button>
          <button className="stopwatch-btn stopwatch-btn-yel     hover:ease-in-out duration-1000 hover:delay-150 hover:skew-y-6 hover:origin-right   btn btn-lg text-white hover:bg-green-600 bg-green-900"
                  onClick={props.reset}>Reset</button>
        </div> : ""
      }

     {(props.status === 2)? 
        <div>
          <button className="stopwatch-btn stopwatch-btn-gre    hover:ease-in-out duration-1000 hover:delay-150 hover:-skew-y-6 hover:origin-top-left   btn btn-lg text-white hover:bg-green-600 bg-green-900"
                  onClick={props.resume}>Resume</button>
          <button className="stopwatch-btn stopwatch-btn-yel    hover:ease-in-out duration-1000 hover:delay-150 hover:-skew-y-6 hover:origin-top-left   btn btn-lg text-white hover:bg-green-600 bg-green-900"
                  onClick={props.reset}>Reset</button>
        </div> : ""
      }
     
    </div>
  );
}

export default BtnComponent;