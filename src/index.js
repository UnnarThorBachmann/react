import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import {BrowserRouter} from "react-router-dom"

/*
* Modified by Unnar Thor Bachmann with by enclosing the App component
* into the BrowserRouter component.
*/
ReactDOM.render(<BrowserRouter><App/></BrowserRouter>, document.getElementById('root'))
