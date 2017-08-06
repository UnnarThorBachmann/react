import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks'
import ListSearch from './ListSearch'
import * as booksAPI from '../src/BooksAPI'
import {Route} from 'react-router-dom'
import {Link} from 'react-router-dom'
/*
* This file was motified by Unnar Thor Bachmann
* This is the main component of the project.
*/
   const terms = ['Android', 
            'Art', 
            'Artificial Intelligence', 
            'Astronomy', 
            'Austen', 
            'Baseball', 
            'Basketball', 
            'Bhagat', 
            'Biography', 
            'Brief', 
            'Business', 
            'Camus', 
            'Cervantes', 
            'Christie', 
            'Classics', 
            'Comics', 
            'Cook', 
            'Cricket', 
            'Cycling', 
            'Desai', 
            'Design', 
            'Development', 
            'Digital Marketing', 
            'Drama', 
            'Drawing', 
            'Dumas', 
            'Education', 
            'Everything', 
            'Fantasy', 
            'Film', 
            'Finance', 
            'First', 
            'Fitness', 
            'Football', 
            'Future', 
            'Games', 
            'Gandhi', 
            'History', 
            'History', 
            'Homer', 
            'Horror', 
            'Hugo', 
            'Ibsen', 
            'Journey', 
            'Kafka', 
            'King', 
            'Lahiri', 
            'Larsson', 
            'Learn', 
            'Literary Fiction', 
            'Make', 
            'Manage', 
            'Marquez', 
            'Money', 
            'Mystery', 
            'Negotiate', 
            'Painting', 
            'Philosophy', 
            'Photography', 
            'Poetry', 
            'Production', 
            'Program Javascript', 
            'Programming', 
            'React', 
            'Redux', 
            'River', 
            'Robotics', 
            'Rowling', 
            'Satire', 
            'Science Fiction', 
            'Shakespeare', 
            'Singh', 
            'Swimming', 
            'Tale', 
            'Thrun', 
            'Time', 
            'Tolstoy', 
            'Travel', 
            'Ultimate', 
            'Virtual Reality', 
            'Web Development', 
            'iOS']

class BooksApp extends React.Component {
	state = {
    	books: []

  	}

	/**
	* @description Fetch all all books from the back-end when component is inserted into the DOM
	* @param None
	* @returns None
	**/
	componentDidMount() {
  		booksAPI.getAll().then((books)=> {
  			this.setState({books})
  		})
  	};
  
	/**
	* @description A prop to the child components for updating the books. 
  *              Main function in the app. Controls the shelf life of each book.
	* @param {string} id - Id of a book
	* @param {shelf} shelf - Which shelf to put the book.
	* @returns None
	**/
	changeShelf = (id,shelf) => {
    
    let onShelf = this.state.books.filter((book) => book.id === id);
    // In case new element is added.
    if (onShelf.length === 0) {
      let self = this;
      booksAPI.get(id).then(function(book) {
        book.shelf = shelf;
        self.setState((state)=>{books: self.state.books.push(book)})
        booksAPI.update(book,shelf);
      }, self)
      
    }
    else if (shelf != 'none') {
      // In case of book is moved between shelves.
      this.setState(function(state) {
        this.state.books = this.state.books.map(function(book) {
          if (book.id === id) {
            book.shelf = shelf;
            booksAPI.update(book,shelf);
          }
          return book;
        });
      });
      
    }
    else {
      // In case book is taken off a shelf.
      this.setState((state)=>{books: this.state.books.map(function(book){
        if (book.id === id)
          book.shelf = shelf;
        return book;
      })})
      booksAPI.get(id).then((book)=>{booksAPI.update(book,shelf)});
    }

  }
  /**
	* @description Renders the search list or the shelves using ReactRouter.
	* @returns rendered UI for the search list
	**/
	render() {
    	return (
      		<div className="app">
  				
        		<Route exact path="/search" render ={() => (
        				<ListSearch changeShelf={this.changeShelf} terms={terms} books={this.state.books}/>
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
 	};
}

export default BooksApp
