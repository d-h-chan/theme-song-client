import React, { Component } from 'react';
import SearchPage from '../SearchPage/SearchPage.js'
import AddPage from '../AddPage/AddPage.js'
import { Route, Link } from 'react-router-dom';
import Context from '../ContextManagement/Context.js'
//import { removeTypeDuplicates } from '@babel/types';

class App extends Component {

  setSearchPageResults = searchPageResults => {
    this.setState({ searchPageResults });
  };

  setAddPageResults = addPageResults => {
    this.setState({ addPageResults });
  };

  setArtists = artists => {
    this.setState({ artists });
  }

  setCheckboxState = checkboxState => {
    this.setState({ checkboxState })
  }

  setIsLoading = isLoading => {
    this.setState({isLoading})
  }

  createCheckboxState = results => {
    let checkboxState = {}
    results.forEach(function (result) {
      let id = result.geniusId
      checkboxState[id] = {
        "checked": false,
        "themes": "",
      }
    });
    return checkboxState
  }

  state = {
    searchPageResults: [],
    setSearchPageResults: this.setSearchPageResults,
    addPageResults: [],
    setAddPageResults: this.setAddPageResults,
    artists: [],
    setArtists: this.setArtists,
    checkboxState: {},
    setCheckboxState: this.setCheckboxState,
    createCheckboxState: this.createCheckboxState,
    isLoading: false,
    setIsLoading: this.setIsLoading
  }

  render() {
    return (
      <main className='App'>
        <Context.Provider value={this.state}>
          <nav>
            <Link to="/">Home</Link> |
            <Link to="/search/">Search</Link> |
            <Link to="/add/">Add</Link>
          </nav>
          <Route exact path='/search' component={SearchPage} />
          <Route exact path='/add' component={AddPage} />
        </Context.Provider>
      </main>
    );
  }
}

export default App;