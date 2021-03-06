import React, {Component} from 'react'

/**
* This component was constructed by Unnar Thor Bachmann.
* This component renders a book shelf.
**/

function ListBooks(props) {
	return (
		<div className="bookshelf">
      <h2 className="bookshelf-title">{props.title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {props.books.map((book)=> (
            <li key={book.id}>
              <div className="book">
                <div className="book-top">
                  <div className="book-cover" style={{width: '100%', height: '100%', backgroundImage: `url(${book.imageLinks.thumbnail})`}}>
                  </div>
                  <div className="book-shelf-changer">
                      <select onChange={(event)=> {props.changeShelf(event.target.id,event.target.value)}} value={book.shelf} id={book.id}>
                        <option value="none" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                  </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors}</div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>			
	)
}

export default ListBooks