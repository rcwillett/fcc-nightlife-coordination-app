import React from 'react';

const Destination = (props) => {
  return (
    <div class="row">
      <div class="col-6">
        <img src={props.image_url || 'http://via.placeholder.com/200x200'} />
      </div>
      <div class="col-6">
        <div class="h5">{props.name}</div>
      </div>
    </div>
  );
}

export { Destination };
