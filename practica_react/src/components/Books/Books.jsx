import './Books.css'
import BookItem from '../BookItem/BookItem'
import BooksFilter from '../Filter/BooksFilter'
import { useState } from 'react'

const Books = ({ books }) => {

  const [selectedYear, setSelectedYear] = useState('2021')

  const onYearChangeHandler = (event) => {
    setSelectedYear(event.target.value)
  }

  const bookList = (books.filter(book => book.dateRead.getFullYear().toString() === selectedYear).map((book) =>
    <BookItem
      key={book.id}
      title={book.title}
      author={book.author}
      date={book.dateRead}
      pageCount={book.pageCount}
    />
  ))

  return (
    <>
      <div className='books-filter-container'>
        <BooksFilter selectedYear={selectedYear} onYearChangeHandler={onYearChangeHandler} />
      </div>
      <div className='books-container'>
        {bookList.length === 0 ?
          (<p> No leiste libros en {selectedYear} </p>)
          :
          (bookList)
        }
      </div>
    </>
  )
}

export default Books
