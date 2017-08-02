import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks'
import ListSearch from './ListSearch'
import * as booksAPI from '../src/BooksAPI';

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: true,
    books: [],
    query: ''
    
  }

  componentDidMount() {
  	booksAPI.getAll().then((books)=> {
  		this.setState({books})
  	})
  }
  
  
  changeShelf = (id,shelf) => {
  	this.setState((state)=> {
  		state.books.map(b => {
  			if (b.id === id) {
  				b.shelf = shelf;
  				return b;
  			}
  			else {	
  				return b;
  			}
  		})
  	});


  	booksAPI.update(this.state.books.filter(b=> b.id === id),shelf);
  }
  updateQuery = (query) => {
  	this.setState({query: query.trim()})
  }
  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
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
            <ListSearch books={this.state.books} changeShelf={this.changeShelf}/>
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <ListBooks 
                	title={'Currently Reading'} 
                	books={this.state.books.filter((book)=> book.shelf === 'currentlyReading')} 
                	changeShelf={this.changeShelf}

                />
                <ListBooks 
                	title={'Want to Read'} 
                	books={this.state.books.filter((book)=> book.shelf === 'wantToRead')} 
                	changeShelf={this.changeShelf}
                />
                <ListBooks 
                	title={'Read'} 
                	books={this.state.books.filter((book)=> book.shelf === 'read')} 
                	changeShelf={this.changeShelf}
                />
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
