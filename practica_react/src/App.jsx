import { useState } from "react";

import './App.css'

import NewBook from "./components/NewBook/NewBook";
import Books from "./components/Books/Books";

const DUMMY_BOOKS = [
  {
    id: 1,
    title: "100 años de soledad",
    author: "Gabriel García Marquez",
    dateRead: new Date(2021, 8, 12),
    pageCount: 410,
  },
  {
    id: 2,
    title: "Todos los fuegos el fuego",
    author: "Julio Cortazar",
    dateRead: new Date(2020, 6, 11),
    pageCount: 197,
  },
  {
    id: 3,
    title: "Asesinato en el Oriente Express",
    author: "Agatha Christie",
    dateRead: new Date(2021, 5, 9),
    pageCount: 256,
  },
  {
    id: 4,
    title: "Las dos torres",
    author: "J.R.R Tolkien",
    dateRead: new Date(2020, 3, 22),
    pageCount: 352,
  },
];

function App() {

  const [books, setBooks] = useState(DUMMY_BOOKS);


  const bookWithHighestId = books.reduce((bookWithHighestId, currentBook) => {
    return bookWithHighestId.id > currentBook.id ? bookWithHighestId : currentBook;
  }, { id: -1 });

  const saveBookHandler = (newBook) => {
    let book = {
      id: bookWithHighestId.id + 1,
      ...newBook
    };
    setBooks([...books, book])

  }



  return (
    <>
      <h1>Books Champion App</h1>
      <Books books={books} />
      <NewBook saveBookHandler={saveBookHandler} />

    </>
  )
}

export default App
