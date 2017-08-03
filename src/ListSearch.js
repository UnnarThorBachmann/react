import React, {Component} from 'react'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'

class ListSearch extends React.Component  {

  state = {
    query: ''
  }
	
	updateQuery = (query) => {
    this.setState({query: query.trim()})
   }
	 render()	{
    let showingBooks
    if (this.state.query) { 
        const match = new RegExp(escapeRegExp(this.state.query),'i')
        showingBooks= this.props.books.filter((book)=>(match.test(book.title) || match.test(book.authors[0])))
    } 
    else {
      showingBooks = this.props.books
    }

    return (
      
       <div className="search-books">
		    <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
   
                <input type="text" 
                    placeholder='Search by title or author'
                    value={this.state.query}
                    onChange={(event)=> this.updateQuery(event.target.value)}
                />  
              </div>
            </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {showingBooks.map((book)=> (
              <li key={book.id} className="search-list">
                <div style={{width: '10%', height: '100%', backgroundImage: `url(${book.imageLinks.thumbnail})`}} className="search-list-right">

                </div>
                <div className="search-list-main">
                  <h4>{book.title}</h4>
                  <p>{book.description.substring(0,700)}{book.description.length > 700? ' ...' : ''}</p>
                </div>
                <div style={{width: '15%'}} className="right-panel">
                  <h6>Author(s): {book.authors ? book.authors.join(', '): 'unknown'}</h6>
                  <h6>Average Rating: {book.averageRating}</h6>
                  <h6>Categories: {book.categories ? book.categories.join(', '): 'unknown'}</h6>
                  <h6>Page count: {book.pageCount ? book.pageCount: 'unknown'}</h6>
                  <h6>Published date: {book.publishedDate ? book.publishedDate: 'unknown'}</h6>
                  <h6>Shelf status:</h6>
                  <select onChange={(event)=> {this.props.changeShelf(event.target.id,event.target.value)}} value={book.shelf} id={book.id}>
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
       </div>      	
		)}
}

export default ListSearch

