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

class BooksApp extends React.Component {
	state = {
    	books: [], 
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
	* @param {string} id - Id of a book
	* @param {shelf} shelf - Which shelf to put the book.
	* @returns None
	**/
	changeShelf = (id,shelf) => {
  		this.setState((state)=> {
  			state.books.map(b => {
  				if (b.id === id) {
  					b.shelf = shelf;
  					return b;
  				}
  				else 
  					return b;
  			})
  		});

  		booksAPI.update(this.state.books.filter(b=> b.id === id)[0],shelf);
  	}
  	/**
	* @description Renders the search list or the shelves using ReactRouter.
	* @returns rendered UI for the search list
	**/
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
 	};
}

export default BooksApp
