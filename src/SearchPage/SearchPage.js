import React, { Component } from 'react';
import Context from '../ContextManagement/Context.js'
import DatabaseApiService from '../services/DatabaseApiService'
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator'
import swal from 'sweetalert';


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
    searchParam = searchParam.trim().toLowerCase()
    this.context.setSearchPageResults([])
    this.context.setIsLoading(true)
    DatabaseApiService.getSongsFromDatabase(searchParam)
      .then(res => {
        this.context.setIsLoading(false)
        this.context.setSearchPageResults(res)
        if (res.length === 0) {
          swal("Error", "No Results Found", "error")
        }
      })
  }

  render() {
    return (
      <>
        <h2>Search Database</h2>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="searchDB" className="upperCase">Search:</label>
          <input type="text" id="searchDB" name="searchDB" placeholder="Example: 'love'"></input>
          <input type="submit" value="search"></input>
        </form>
        <hr></hr>

        <table>
          <tbody>
            {(this.context.searchPageResults != null) && (
              <tr>
                <th>Title</th>
                <th>Artist</th>
                <th>Labels</th>
              </tr>
            )}
            {this.context.searchPageResults != null && (
              this.context.searchPageResults.map(this.createTableRow)
            )}
          </tbody>
        </table>
        <LoadingIndicator></LoadingIndicator>
      </>
    );
  }
}

export default SearchPage;