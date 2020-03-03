import React, { Component } from 'react';
import Context from '../ContextManagement/Context.js'
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator'
import DatabaseApiService from '../services/DatabaseApiService'

class AddPage extends Component {

  static contextType = Context;

  componentDidMount() {
    this.context.setIsLoading(true)
    DatabaseApiService.getArtistsFromDatabase()
      .then(res => {
        this.context.setIsLoading(false)
        this.context.setArtists(res)
      })
  }

  createAddTableRow = (item, index) => {
    return (
      <tr key={index}>
        <td>
          <input
            type="checkbox"
            id={item.geniusId}
            checked={this.context.checkboxState[item.geniusId].checked}
            onChange={this.handleCheckboxChange}>
          </input></td>
        <td><a href={item.url} target="_blank">{item.title}</a></td>
        <td>{item.artist}</td>
        <td>
          <input
            type="text"
            id={item.geniusId}
            value={this.context.checkboxState[item.geniusId].themes}
            onChange={this.handleTextChange}
            disabled={!this.context.checkboxState[item.geniusId].checked}>
          </input></td>
      </tr>)
  }

  createArtistSelect = (item, index) => {
    return (
      <option key={index} value={item.id}>{item.name}</option>
    )
  }

  handleCheckboxChange = (event) => {
    let checkboxState = this.context.checkboxState
    checkboxState[event.target.id].checked = event.target.checked
    this.context.setCheckboxState(checkboxState)
  }

  handleTextChange = (event) => {
    let checkboxState = this.context.checkboxState
    checkboxState[event.target.id].themes = event.target.value
    this.context.setCheckboxState(checkboxState)
  }

  handleSubmitSearch = (event) => {
    event.preventDefault()
    let searchParam = event.target.searchDB.value
    this.context.setCheckboxState({})
    this.context.setAddPageResults([]) //set state
    this.context.setIsLoading(true)
    DatabaseApiService.searchGeniusBySearch(searchParam)
      .then(results => {
        this.context.setIsLoading(false)
        this.handleSearch(results)
      })

  }

  handleArtistSearch = (event) => {
    event.preventDefault()
    this.context.checkboxState = {}
    let artist = event.target.artists.value
    this.context.setCheckboxState({})
    this.context.setAddPageResults([]) //set state
    this.context.setIsLoading(true)
    DatabaseApiService.searchGeniusByArtist(artist)
      .then(results => {
        this.context.setIsLoading(false)
        this.handleSearch(results)
      })
  }

  handleSearch = (results) => {
    this.context.setCheckboxState(this.context.createCheckboxState(results))
    this.context.setAddPageResults(results) //set state
  }

  handleSubmitToPost = () => {
    const checkboxState = this.context.checkboxState
    const output = this.context.addPageResults.filter(function (result) {
      return checkboxState[result.geniusId].checked === true
    });
    for (const item of output) {
      item["themes"] = checkboxState[item.geniusId].themes
    }
    console.log(output)
    if (Array.isArray(output) && output.length) {
      this.context.setIsLoading(true)
      DatabaseApiService.postToDb(output)
        .then(res => {
          DatabaseApiService.getArtistsFromDatabase()
            .then(this.context.setArtists)
          this.context.setIsLoading(false)
          alert(res)
        });
    }
    else {
      alert("no boxes were checked!")
    }

  }

  render() {
    return (
      <>
        <form onSubmit={this.handleSubmitSearch}>
          <label htmlFor="searchDB">Open Search:</label>
          <input type="text" id="searchDB" name="searchDB"></input>
          <input type="submit"></input>
        </form>
        <form onSubmit={this.handleArtistSearch}>
          <label htmlFor="artists">Or, choose an artist:</label>
          <select id="artists" name="artists">
            {this.context.artists.map(this.createArtistSelect)}
          </select>
          <input type="submit"></input>
        </form>

        {this.context.addPageResults.length > 0 && (
          <>
            <button onClick={this.handleSubmitToPost}>Add to Database</button>
            <table>
              <tbody>

                <tr>
                  <th></th>
                  <th>Title</th>
                  <th>Artist</th>
                  <th>Labels</th>
                </tr>
                {this.context.addPageResults.map(this.createAddTableRow)}
              </tbody>
            </table>
          </>
        )}
        <LoadingIndicator></LoadingIndicator>
      </>
    );
  }
}

export default AddPage;