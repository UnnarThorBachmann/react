import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks'
import ListSearch from './ListSearch'
import * as booksAPI from '../src/BooksAPI'
import {Route} from 'react-router-dom'
import {Link} from 'react-router-dom'


class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: [],
    
    
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
  				b.shelf = shelf
  				return b
  			}
  			else {	
  				return b
  			}
  		})
  	});

  	
  	booksAPI.update(this.state.books.filter(b=> b.id === id)[0],shelf);
  }
  
  render() {
    return (
      <div className="app">
        <Route exact path="/search" render ={() => (
        	<ListSearch books={this.state.books} changeShelf={this.changeShelf}/>
        	)}
        />
        <Route exact path ="/" render ={() => (
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
              <Link to="/search">Add a book></Link>
            </div>
          </div>
        	)}
        />  
            
         
        
          
       
      </div>
    )
  }
}

export default BooksApp
