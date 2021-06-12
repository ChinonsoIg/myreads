import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import { Route } from 'react-router-dom';
import MainPage from './components/MainPage';
import SearchPage from './components/SearchPage';

class App extends Component {
  state = {
    error: null,
    isLoaded: false,
    mainBooks: [],
    query: '',
  }
  
  componentDidMount() {
    BooksAPI.getAll()
      .then((all) => {
        this.setState(() => ({
          isLoaded: true,
          mainBooks: all
        }))     
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
      )
  }
 
  handleShelfChange = (book, newValue) => {
    book.shelf = newValue;

    const updatedBooks = this.state.mainBooks.filter( (b) => b.id !== book.id)

    this.setState(() => ({
        mainBooks: [...updatedBooks, book]
    }))

    BooksAPI.update(book, newValue);

  }

  render() {
    const { error, isLoaded, mainBooks } = this.state;
    let altImage = ["https://blog.bakeca.it/wp-content/uploads/2020/11/blog-bakeca_libri-viandanti-2-400x599.jpg"];

    if (error) {
      return <div className="app">Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div className="app">Loading...</div>;
    } else {
      return (
        <div className="app">
          <Route exact path="/" render={() => (
            <MainPage 
              mainBooks={mainBooks}
              handleShelfChange={this.handleShelfChange}
              altImage={altImage}
            />
          )} />
        
          <Route path="/search" render={() => (
            <SearchPage 
              mainBooks={mainBooks}
              handleShelfChange={this.handleShelfChange}
              altImage={altImage}
            />
          )} />
        </div>
      );
    }
  }
}

export default App
