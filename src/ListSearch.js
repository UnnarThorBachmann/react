import React, {Component} from 'react'
//import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import {Link} from 'react-router-dom'
class ListSearch extends React.Component  {

  state = {
    query: '',
    orderBy:'title',
    filter:''
  }
	
	updateQuery = (query) => {
    this.setState({query: query.trim()})
   }
	 render()	{
    let showingBooks

    if (this.state.query) { 
        const match = new RegExp(escapeRegExp(this.state.query),'i')
        showingBooks= this.props.books.filter((book)=>(match.test(book.title) || match.test(book.authors.join())))
    } 
    else {
      showingBooks = this.props.books
    }

    if (this.state.orderBy === 'date')
      showingBooks.sort(sortBy('-publishedDate'))
    else if (this.state.orderBy === 'rating')
      showingBooks.sort(function(a,b) {
        if (typeof a.averageRating === 'undefined'  && typeof b.averageRating === 'undefined')
          return 0
        else if (typeof a.averageRating === 'undefined')
          return 1
        else if (typeof b.averageRating === 'undefined')
          return -1
        else
          return Number(b.averageRating)-Number(a.averageRating);
      })
    else if (this.state.orderBy === 'shelf') {
      showingBooks.sort(function(a,b) {
        if (a.shelf === 'read')
          return 1;
        else if (a.shelf === 'wantToRead')
          return -1
        else if (a.shelf === 'currentlyReading' && b.shelf === 'read')
          return -1
        else if (a.shelf === 'currentlyReading' && b.shelf === 'wantToRead')
          return 1
      })
    }
    else
      showingBooks.sort(sortBy('title'))
    
    if (this.state.filter !=='' && ['Business', 'Computers','Economics','Fiction', 'Performing Arts'].includes(this.state.filter)) {
      showingBooks = showingBooks.filter((book) => (
        book.categories && (book.categories.join(' ').toLowerCase().indexOf(this.state.filter.toLowerCase()) !== -1)
      ))

    }

    if (this.state.filter !=='' && ['read','currentlyReading','wantToRead','none'].includes(this.state.filter)) {
      showingBooks = showingBooks.filter((book) => (book.shelf === this.state.filter))
    }
    
    
    
    return (
      
      <div className="search-books">
		    <div className="search-books-bar">
          <Link 
            className="close-search"
            to="/"
          >Close</Link>
            <div className="search-books-input-wrapper">
              <input type="text" 
                placeholder='Search by title or author'
                value={this.state.query}
                onChange={(event)=> this.updateQuery(event.target.value)}
              />  
            </div>
        </div>
        <div className="search-books-results">
          <div className="filter-sort">
            <div>
              <span>Filter: </span>
              <select onChange={(event)=> {this.setState({filter: event.target.value})}}>
                <option value=""></option>
                <option value="none" disabled>Filter by Category</option>                    
                <option value="Business">Business</option>
                <option value="Computers">Computers</option>
                <option value="Economics">Economics</option>
                <option value="Fiction">Fiction</option>
                <option value="Performing Arts">Performing Arts</option>
                <option value="none" disabled>Filter by Shelf</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
            <div>        
              <span>Order by: </span>
              <select onChange={(event)=> {this.setState({orderBy: event.target.value})}}>
                <option value=""></option>
                <option value="date">Date</option>
                <option value="rating">Rating</option>
                <option value="shelf">Shelf</option>
                <option value="title">Title</option>
              </select>
            </div> 
          </div>
          <ol className="books-grid">
            {showingBooks.map((book)=> (
              <li key={book.id} className="search-list">
                <div style={{width: '10%', height: '100%', backgroundImage: `url(${book.imageLinks.thumbnail})`}} className="search-list-thumb">
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

