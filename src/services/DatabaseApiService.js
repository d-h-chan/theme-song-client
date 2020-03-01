//import config from '../config'
import config from '../config'
import {geniusSearchResults, geniusArtistSearchResults, artistList}from '../store.js'

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
    return fetch(`${config.API_ENDPOINT}/database/artists`, {

    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
    //return artistList;
  },
  searchGeniusBySearch(input) {
    return fetch(`${config.API_ENDPOINT}/genius/search?q=${encodeURI(input)}`, {

    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  searchGeniusByArtist(input) {
    return fetch(`${config.API_ENDPOINT}/genius/search/${encodeURI(input)}`, {

    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
    return geniusArtistSearchResults;
  },
  postToDb(inputArray) {
    alert(`Mock post: ${inputArray}`)
    console.log(inputArray)
  }
}

export default DatabaseApiService
