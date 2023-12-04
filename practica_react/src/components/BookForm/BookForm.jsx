import React, { useEffect, useRef, useState } from 'react'
import './BookForm.css'
import Rating from './Rating';

const categories = [
  { id: 1, name: 'Ficción' },
  { id: 2, name: 'No ficción' }
];

const subcategories = [
  { id: 1, name: 'Novela', categoryId: 1 },
  { id: 2, name: 'Cuento', categoryId: 1 },
  { id: 3, name: 'Poesía', categoryId: 1 },
  { id: 4, name: 'Biografía', categoryId: 2 },
  { id: 5, name: 'Ensayo', categoryId: 2 },
  { id: 6, name: 'Historia', categoryId: 2 }
];

const BookForm = ({ saveBookHandler, showFormChangeHandler }) => {

  const inicialData = {
    title: '',
    author: '',
    dateRead: '',
    pageCount: '',
    category: '',
    subcategory: '',
    status: '',
    review: '',
    progress: '',
    rating: ''
  }

  const [newbook, setNewbook] = useState(inicialData)
  const [subcategoriesFiltered, setSubcategoryFiltered] = useState([])
  const [errors, setErrors] = useState(null);

  const reviewRef = useRef(null);

  const validationRequirements = {
    title: { required: true, minLength: 3 },
    author: { required: true },
    dateRead: { required: true },
    pageCount: { required: true },
    category: { required: true },
    subcategory: { required: true },
    status: { required: true },
  }


  useEffect(() => {
    if (newbook.status === 'read_it') {
      reviewRef.current.focus();
    }

  }, [newbook.status])

  const onChangeHandler = (event) => {
    let { name, value } = event.target;

    if (name == 'category') {
      setSubcategoryFiltered(subcategories.filter(s => s.categoryId == value))
    }

    setNewbook({ ...newbook, [name]: value });
  }

  const onBlurHandler = (event) => {
    let {name} = event.target;
    let error = '';
    if (validationRequirements[name].required && !newbook[name]) {
      error = 'El campo es obligatorio.';
    } else if (validationRequirements[name].minLength > 0 && newbook[name].length < validationRequirements[name].minLength) {
      error = 'El campo debe terner al menos ' + validationRequirements[name].minLength + ' caracteres.';
    };

    setErrors({...errors, [name]: error});

  }

  const onRatingChangeHandler = (value) => {
    setNewbook({ ...newbook, 'rating': value });
  }

  const validate = () => {
    let errors = {};
    if (newbook) {
      Object.keys(validationRequirements).forEach((key) => {
        if (validationRequirements[key].required && !newbook[key]) {
          errors[key] = 'El campo es obligatorio.';
        } else if (validationRequirements[key].minLength > 0 && newbook[key].length < validationRequirements[key].minLength) {
          errors[key] = 'El campo debe terner al menos ' + validationRequirements[key].minLength + ' caracteres.';
        }
      });
    }
    return errors;
  }

  const onSubmitHandler = (event) => {
    event.preventDefault();

    const errors = validate();

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    let book = { ...newbook, 'dateRead': new Date(newbook.dateRead) };
    saveBookHandler(book);
    setNewbook(inicialData);
  }

  return (
    <form onSubmit={onSubmitHandler}>

      <div className='new-book-control'>
        <label>Título</label>
        <input name='title' type='text' value={newbook.title} onChange={onChangeHandler} onBlur={onBlurHandler} />
        {errors?.title && <p className='new-book-error'>{errors.title}</p>}
      </div>

      <div className='new-book-control'>
        <label>Autor</label>
        <input name='author' type='text' value={newbook.author} onChange={onChangeHandler} onBlur={onBlurHandler} />
        {errors?.author && <p className='new-book-error'>{errors.author}</p>}
      </div>

      <div className='new-book-control'>
        <label>¿Cuándo terminaste de leerlo?</label>
        <input name='dateRead' type='date' min='2019-01-01' max={new Date().toISOString().split('T')[0]} value={newbook.dateRead} onChange={onChangeHandler} />
        {errors?.dateRead && <p className='new-book-error'>{errors.dateRead}</p>}
      </div>

      <div className='new-book-control'>
        <label>Páginas</label>
        <input name='pageCount' type='number' min='1' step='1' value={newbook.pageCount} onChange={onChangeHandler} />
        {errors?.pageCount && <p className='new-book-error'>{errors.pageCount}</p>}
      </div>

      <div className='new-book-control'>
        <label>Categoría</label>
        <select name="category" value={newbook.category} onChange={onChangeHandler}>
          {categories.map(category =>
            <option value={category.id} key={category.id}>
              {category.name}
            </option>
          )}
        </select>
        {errors?.category && <p className='new-book-error'>{errors.category}</p>}
      </div>

      <div className='new-book-control' >
        <label>Subcategoría</label>
        <select name='subcategory' value={newbook.subcategory} onChange={onChangeHandler} >
          {subcategoriesFiltered.map(subcategory =>
            <option value={subcategory.id} key={subcategory.id}>
              {subcategory.name}
            </option>
          )}
        </select>
        {errors?.subcategory && <p className='new-book-error'>{errors.subcategory}</p>}
      </div>


      <div className='new-book-control' >
        <label>Libro</label>
      </div>
      <div className='new-book-inline-control'>
        <label>
          <input type="radio" name="status" onChange={onChangeHandler} value='want_to_read' />
          Quiero leerlo
        </label>
        <label>
          <input type="radio" name="status" onChange={onChangeHandler} value='reading' />
          Lo estoy leyendo
        </label>
        <label>
          <input type="radio" name="status" onChange={onChangeHandler} value='read_it' />
          Terminé de leerlo
        </label>
        {errors?.status && <p className='new-book-error'>{errors.status}</p>}
      </div>

      {newbook.status === 'read_it' &&
        <>
          <div className='new-book-control'>
            <label>Crítica del libro</label>
            <textarea name="review" value={newbook.review} onChange={onChangeHandler} ref={reviewRef}>
            </textarea>
          </div>

          <div className='new-book-control'>
            <label>Rating</label>
            <Rating
              value={newbook.rating}
              onChange={onRatingChangeHandler}
              className={'book-form-rating'}
            />
          </div>
        </>
      }

      {newbook.status === 'reading' &&
        <div className='new-book-control'>
          <label>Progreso de lectura</label>
          <input type="range" name="progress" min='0' max='100' step='10' value={newbook.progress} onChange={onChangeHandler} />
          <span>{newbook.progress} %</span>
        </div>
      }

      <div className='new-book-actions'>
        <button type='submit'>Agregar Lectura</button>
        <button onClick={showFormChangeHandler}>Cancelar</button>
      </div>

    </form>
  )
}

export default BookForm
