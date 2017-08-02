import React, {Component} from 'react'

function ListSearch(props) {
	
		
		return (
		
        <div className="search-books-results">
          <ol className="books-grid">
            {props.books.map((book)=> (
              <li key={book.id} className="search-list">
                <div style={{width: '10%', height: '100%', backgroundImage: `url(${book.imageLinks.thumbnail})`}} className="search-list-thumb">

                </div>
                <div className="search-list-main">
                  <h4>{book.title}</h4>
                  <p>{book.description.substring(0,700)}{book.description.length > 700? ' ...' : ''}</p>
                </div>
                <div style={{width: '10%'}}>
                  <select onChange={(event)=> {props.changeShelf(event.target.id,event.target.value)}} value={book.shelf} id={book.id}>
                    <option value="none" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                  </select>
                </div>
              </li>
            ))}
          </ol>
        </div>  	
                 	
            	
			
		)
}

export default ListSearch

/*
                       <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{width: '100%', height: '100%', backgroundImage: `url(${book.imageLinks.smallThumbnail})`}}></div>
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
*/