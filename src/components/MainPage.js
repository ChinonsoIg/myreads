import React, { Component } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import CurrentlyReading from './CurrentlyReading';
import WantToRead from './WantToRead';
import Read from './Read';
import PropTypes from 'prop-types';

class MainPage extends Component {
  static propTypes = {
    mainBooks: PropTypes.array.isRequired,
    handleShelfChange: PropTypes.func.isRequired
  }

  render() {
    const { mainBooks, handleShelfChange, altImage } = this.props;
    
    return (
      <div className="app">
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>                  
                  <div className="bookshelf-books">
                    {
                      <CurrentlyReading 
                        mainBooks={mainBooks} 
                        handleShelfChange={handleShelfChange}
                        altImage={altImage}
                      />
                    }
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    {
                      <WantToRead 
                        mainBooks={mainBooks}
                        handleShelfChange={handleShelfChange}
                        altImage={altImage}
                      />
                    }
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    {
                      <Read 
                        mainBooks={mainBooks}
                        handleShelfChange={handleShelfChange}
                        altImage={altImage}
                      />
                    }
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
      </div>
    );
  }
}
  MainPage.propTypes = {
    mainBooks: PropTypes.array.isRequired,
    handleShelfChange: PropTypes.func.isRequired
  }

export default MainPage;