import React from 'react';

const Destination = (props) => {
  return (
    <div className="row">
      <div className="col-6">
        <img src={props.image_url || 'http://via.placeholder.com/200x200'} />
      </div>
      <div className="col-6">
        <div className="h5">{props.name}</div>
      </div>
    </div>
  );
}

export { Destination };
