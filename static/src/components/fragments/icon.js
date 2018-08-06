import React from 'react';

function Icon(props) {
  return (
    <svg viewBox="0 0 24 24"
      style={{ width: '24px', height: '24px' }}>
      <path d={props.path}/>
    </svg>
  )
}

export default Icon;