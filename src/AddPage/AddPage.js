import React, { Component } from 'react';
import Context from '../ContextManagement/Context.js'
import DatabaseApiService from '../services/DatabaseApiService'

class AddPage extends Component {

  static contextType = Context;

  componentDidMount() {
    this.context.setArtists(DatabaseApiService.getArtistsFromDatabase())
  }

  createAddTableRow = (item, index) => {
    return (
      <tr key={index}>
        <td>
          <input
            type="checkbox"
            value={item.geniusId}
            checked={this.context.checkboxState.checked}
            onChange={this.handleCheckboxChange}>
          </input></td>
        <td><a href={item.url}>{item.title}</a></td>
        <td>{item.artist}</td>
        <td></td>
      </tr>)
  }

  createArtistSelect = (item, index) => {
    return (
      <option key={index} value={item.id}>{item.name}</option>
    )
  }

  handleCheckboxChange = (event) => {
    //let newState = this.context.checkboxState[event.target.value]
    //newState.checked = event.target.checked


    let checkboxState = this.context.checkboxState
    checkboxState[event.target.value].checked = event.target.checked
    this.context.setCheckboxState(checkboxState)
  }

  handleSubmitSearch = (event) => {
    event.preventDefault()
    let searchParam = event.target.searchDB.value
    let results = DatabaseApiService.searchGeniusBySearch(searchParam)
    this.context.setAddPageResults(results) //set state
    this.context.setCheckboxState(this.context.createCheckboxState(results))
  }

  render() {
    return (
      <>
        <form onSubmit={this.handleSubmitSearch}>
          <label htmlFor="searchDB">Open Search:</label>
          <input type="text" id="searchDB" name="searchDB"></input>
          <input type="submit"></input>
        </form>
        <form>
          <label htmlFor="artists">Or, choose an artist:</label>
          <select id="artists" name="artists">
            {this.context.artists.map(this.createArtistSelect)}
          </select>
          <input type="submit"></input>
        </form>

        <table>
          <tbody>
            {this.context.addPageResults.length > 0 && (
              <tr>
                <th></th>
                <th>Title</th>
                <th>Artist</th>
                <th>Labels</th>
              </tr>
            )}
            {this.context.addPageResults.map(this.createAddTableRow)}
          </tbody>
        </table>
      </>
    );
  }
}

export default AddPage;