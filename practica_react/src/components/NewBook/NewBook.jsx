import React, { useState } from 'react'
import './NewBook.css'
import BookForm from '../BookForm/BookForm'

const NewBook = ({ saveBookHandler }) => {

  const [showForm, setShowForm] = useState(false);

  const showFormChangeHandler = () => {
    setShowForm(!showForm);
  }

  return (
    <div className='new-book-container'>
      {
        showForm ?
          (
            <div className='new-book' >
              <BookForm saveBookHandler={saveBookHandler} showFormChangeHandler={showFormChangeHandler} />
            </div >
          )
          :
          (
            <button onClick={showFormChangeHandler}>Agregar Nueva Lectura</button>
          )

      }
    </div>
  )
}

export default NewBook
