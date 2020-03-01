import React, { Component } from 'react';
import Context from '../ContextManagement/Context.js'
import DatabaseApiService from '../services/DatabaseApiService'

class SearchPage extends Component {

  static contextType = Context;

  createTableRow = (item, index) => {
    return (
      <tr key={index}>
        <td><a href={item.url} target="_blank">{item.title}</a></td>
        <td>{item.artist}</td>
      </tr>)
  }

  handleSubmit = (event) => {
    event.preventDefault()
    let searchParam = event.target.searchDB.value
    DatabaseApiService.getSongsFromDatabase(searchParam)
      .then(this.context.setSearchPageResults)
  }

  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="searchDB">Search:</label>
          <input type="text" id="searchDB" name="searchDB"></input>
          <input type="submit"></input>
        </form>

        <table>
          <tbody>
            {this.context.searchPageResults.length > 0 && (
              <tr>
              <th>Title</th>
              <th>Artist</th>
            </tr>
            )}
            {this.context.searchPageResults.map(this.createTableRow)}
          </tbody>
        </table>
      </>
    );
  }
}

export default SearchPage;