import React, {Component} from 'react'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import {Link} from 'react-router-dom'
import * as booksAPI from '../src/BooksAPI'

/**
* This component was constructed by Unnar Thor Bachmann.
* Some of the code is under heavy influence from the video
* lectures.
* This component renders the search list.
**/
class ListSearch extends React.Component  {

  
  state = {
    query: '',
    filter:'',
    books: []
  }
  
  /**
  * @description A helper function to sort by rating.
  * @param {object} a - An object to compare with object b.
  * @param {object} b - An object to compare with object a.
  * @returns An integer which is a comparison of a and b.
  **/
  rateComparator = (a,b) => {
          if (typeof a.averageRating === 'undefined'  && typeof b.averageRating === 'undefined')
            return 0
          else if (typeof a.averageRating === 'undefined')
            return 1
          else if (typeof b.averageRating === 'undefined')
            return -1
          else
            return Number(b.averageRating)-Number(a.averageRating);
  }
	/**
  * @description A function to update the query string.
  * @param {string} query - The state variablee being updated.
  * @returns None
  **/
	updateSearch = (query) => {
    this.setState({query: query});
      const match = new RegExp(escapeRegExp(query.trim()),'i');
      let filtered_terms = this.props.terms.filter((term)=>(match.test(term)));
      filtered_terms.sort(function(a,b) { return a.length - b.length;});
      if (filtered_terms.length !== 0) {
        booksAPI.search(filtered_terms[0]).then((data)=>{this.setState({books: data.map(function(book) {
          let onShelf = this.props.books.filter(shelf_book=>book.id === shelf_book.id);
          book.shelf = (onShelf.length !== 0) ? onShelf[0].shelf: 'none';
          return book;
        },this)})})
      }
      else
        this.setState({books: []})

  }
  /**
  * @description A function to sort the searched books.
  * @param {string} order - Selected order of the books.
  * @returns None
  **/
  updateOrder = (order) => {
    if (order === 'date')
      this.setState({books: this.state.books.sort(sortBy('-publishedDate'))})
    else if (order === 'rating')
      this.setState({books: this.state.books.sort(this.rateComparator)})
    else
      this.setState({books: this.state.books.sort(sortBy('title'))})

  };
  /**
  * @description A function to select a book on the shelf.
  * @param {string} id - The id of the book selected.
  * @param {string} shelf - The shelf selected.
  * @returns None
  **/
  selectShelf = (id,shelf)=> {
    this.props.changeShelf(id,shelf);
    this.setState({books: this.state.books.map(function(book) {
        if (book.id === id) {
          book.shelf = shelf;
          return book;
        }
        else
          return book;

      })
    })
  }
	render()	{
    return (
      
      <div className="search-books">
		    <div className="search-books-bar">
          <Link 
            className="close-search"
            to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input type="text" 
              placeholder='Search by title or author'
              value={this.state.query}
              onChange={(event)=> this.updateSearch(event.target.value)}
            />  
          </div>
        </div>
        <div className="search-books-results">
          <div className="filter-sort">
            <div>        
              <span>Order by: </span>
              <select onChange={(event)=> {this.updateOrder(event.target.value)}}>
                <option value=""></option>
                <option value="date">Date</option>
                <option value="rating">Rating</option>
                <option value="title">Title</option>
              </select>
            </div> 
          </div>
          <ol className="books-grid">
            {this.state.books.map((book)=> (
              <li key={book.id} className="search-list">
                <div style={{width: '10%', height: '100%', backgroundImage: `url(${(book.imageLinks)?book.imageLinks.thumbnail:''})`}} className="search-list-thumb">
                </div>
                <div className="search-list-main">
                  <h4>{book.title}</h4>
                  <p>{book.description? book.description.substring(0,700): ''} {book.description ? (book.description.length > 700? ' ...' : ''):''}</p>
                </div>
                <div style={{width: '15%'}} className="right-panel">
                  <h6>Author(s): {book.authors ? book.authors.join(', '): 'unknown'}</h6>
                  <h6>Average Rating: {book.averageRating}</h6>
                  <h6>Categories: {book.categories ? book.categories.join(', '): 'unknown'}</h6>
                  <h6>Page count: {book.pageCount ? book.pageCount: 'unknown'}</h6>
                  <h6>Published date: {book.publishedDate ? book.publishedDate: 'unknown'}</h6>
                  <h6>Shelf status:</h6>
                  <select onChange={(event)=> {this.selectShelf(event.target.id,event.target.value)}} value={book.shelf} id={book.id}>
                    <option value="none" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                  </select>
                </div>
              </li>
            ))}
          </ol>
        </div>  	
      </div>      	
		)
  }
}

export default ListSearch

