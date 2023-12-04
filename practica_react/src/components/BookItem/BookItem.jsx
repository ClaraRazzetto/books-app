import './BookItem.css'

import ReadDate from '../ReadDate/ReadDate'
import BookCard from '../BookCard/BookCard'

const BookItem = ({ title, author, date, pageCount }) => {
  return (
    <BookCard>
      <h2>{title}</h2>
      <h3>{author}</h3>
      <div> 
        <ReadDate date={date} />
      </div>
      <p> {pageCount} páginas</p>
    </BookCard>
  )
}

export default BookItem
