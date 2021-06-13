import React, { Component } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../BooksAPI';
import PropTypes from 'prop-types';

class SearchPage extends Component {  
  state = {
    query: '',
    newBooks: [],
    err: false,
  }

  static propTypes = {
    mainBooks: PropTypes.array.isRequired,
    handleShelfChange: PropTypes.func.isRequired
  }
  
  getBooks = (event) => {
    const query = event.target.value
    this.setState(() => ({
      query
    }))
    
    if(query) {
      BooksAPI.search(query, 20)
        .then(books => {
          books.length > 0 
            ? this.setState(() => ({ newBooks: books, err: false }))
            : this.setState(() => ({ newBooks: [], err: true }))
        })
    }    
    return this.setState(() => ({ newBooks: [], err: true }))
  }
  
  checkState = (book, bookArr) => {
    const newBook = bookArr.filter(c => c.id === book.id);
    
    if(newBook.length > 0) {
      return newBook.map((bk) => {
        const newShelf = Object.assign(book, { shelf: bk.shelf });
        const updatedShelf = newShelf.shelf;
        return updatedShelf;
      })
    } else {
      const newShelf = Object.assign(book, { shelf: "none" });
      const updatedShelf = newShelf.shelf;
      return updatedShelf;
    }
  }
  
  render() {
    const { query, newBooks } = this.state;
    const { mainBooks, handleShelfChange, altImage } = this.props;

    return (
      <div className="app">
        <div className="search-books">
          <div className="search-books-bar">
            <Link to="/" className="close-search">Close</Link>
            <div className="search-books-input-wrapper">                
              <input 
                type="text" 
                placeholder="Search by title or author"
                value={query}
                onChange={this.getBooks}
              />

            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
            {
              newBooks.length < 1
              ? <li>
                  <div>
                    <p>No book matches your search!!</p>
                    <p>Please enter a valid search term</p>
                  </div>
                </li>
              : newBooks.map((book) => (                
                <li key={book.id}>
                    <div className="book">
                      <div className="book-top">
                        <div className="book-cover" style={{width: 128, height: 193}}>
                          <img 
                            src={book.imageLinks !== undefined ? book.imageLinks.thumbnail : altImage[0]} 
                            alt={book.title} 
                            style={{width: "100%", height: "100%"}} />
                        </div>
                      <div className="book-shelf-changer">
                        <select 
                          value={this.checkState(book, mainBooks)}
                          onChange={(e) => handleShelfChange(book, e.target.value)}
                          // multiple={Array.isArray(this.checkState(book, mainBooks)) ? true : false}
                          >
                          <option value="move" disabled>Move to...</option>
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
                </li>
              )) 
            }
            </ol>
          </div>
        </div>        
      </div>
    );
  }
}

export default SearchPage
