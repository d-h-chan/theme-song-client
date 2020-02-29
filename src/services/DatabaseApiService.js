//import config from '../config'
import config from '../config'
import {databaseSearchResults, geniusSearchResults, geniusArtistSearchResults, artistList}from '../store.js'

const DatabaseApiService = {
  getSongsFromDatabase(input) {
    return fetch(`${config.API_ENDPOINT}/database/songs?q=${encodeURI(input)}`, {

    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  getArtistsFromDatabase() {
    return artistList;
  },
  searchGeniusBySearch(input) {
    return geniusSearchResults;
  },
  searchGeniusByArtist(input) {
    return geniusArtistSearchResults;
  },
  postToDb(inputArray) {
    alert(`Mock post: ${inputArray}`)
    console.log(inputArray)
  }
}

export default DatabaseApiService
