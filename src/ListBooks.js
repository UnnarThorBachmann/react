import React, {Component} from 'react'

function ListBooks(props) {
	
		return (
			<div className="bookshelf">
            	<h2 className="bookshelf-title">{props.title}</h2>
                 <div className="bookshelf-books">
                 	<ol className="books-grid">
            	  	</ol>
            	</div>
            </div>
			
		)
}

export default ListBooks