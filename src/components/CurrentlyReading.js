import React from 'react';
import '../App.css';
import PropTypes from 'prop-types';

const CurrentlyReading = ({ mainBooks, handleShelfChange, altImage }) => {   
  CurrentlyReading.propTypes = {
    mainBooks: PropTypes.array.isRequired,
    handleShelfChange: PropTypes.func.isRequired
  }
      
  const currentlyReading = (bookShelf) => {
    let bookArray = [];
    bookShelf.map((mainbook) => {
      if(mainbook.shelf === "currentlyReading") {
        bookArray = [...bookArray, mainbook];
        return bookArray;
      }
      return null;
    })
    return bookArray;
  }

  return (
    <ol className="books-grid">
      {
        currentlyReading(mainBooks).length === 0
        ? <li>No book in this shelf!</li>
        : currentlyReading(mainBooks).map((book) => (
          <li key={book.id}>
            <div className="book">
              <div className="book-top">
                <div className="book-cover" style={{width: 128, height: 193}}>
                  <img src={book.imageLinks !== undefined ? book.imageLinks.thumbnail : altImage[0]} alt={book.title} style={{width: "100%", height: "100%"}} />
                </div>
                <div className="book-shelf-changer">
                  <select 
                    value={book.shelf} 
                    onChange={(e) => handleShelfChange(book, e.target.value)}
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
              <div className="book-authors">{book.authors.join(", ")}</div>
            </div>
          </li>
        ))
      }
    </ol>
  );
}

export default CurrentlyReading;