import React, { Component } from 'react';
import Context from '../ContextManagement/Context.js'
import DatabaseApiService from '../services/DatabaseApiService'
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator'

class SearchPage extends Component {

  static contextType = Context;

  createTableRow = (item, index) => {
    return (
      <tr key={index}>
        <td><a href={item.url} target="_blank">{item.title}</a></td>
        <td>{item.artist}</td>
        <td>{item.themes}</td>
      </tr>)
  }

  handleSubmit = (event) => {
    event.preventDefault()
    let searchParam = event.target.searchDB.value
    this.context.setSearchPageResults([])
    this.context.setIsLoading(true)
    DatabaseApiService.getSongsFromDatabase(searchParam)
      .then(res => {
        this.context.setIsLoading(false)
        this.context.setSearchPageResults(res)
      })
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
              <th>Labels</th>
            </tr>
            )}
            {this.context.searchPageResults.map(this.createTableRow)}
          </tbody>
        </table>
        <LoadingIndicator></LoadingIndicator>
      </>
    );
  }
}

export default SearchPage;