import React from 'react'
import './ReadDate.css'

const ReadDate = ({date}) => {

    const year = date.getFullYear();
    const month = date.toLocaleString('es-AR',{month: 'long'});
    const day = date.toLocaleString('es-AR',{day: '2-digit'});
    
  return (
    <div className='readDate-container'>
        <div>{day}</div>
        <div>{month}</div>
        <div>{year}</div>
    </div>
  )
}

export default ReadDate
