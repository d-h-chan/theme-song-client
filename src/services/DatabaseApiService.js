import config from '../config'
import swal from 'sweetalert';

const DatabaseApiService = {
  getSongsFromDatabase(input) {
    return fetch(`${config.API_ENDPOINT}/database/songs?q=${encodeURI(input)}`, {

    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => {
            Promise.reject(e)})
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
  },
  postToDb(inputArray) {
    return fetch(`${config.API_ENDPOINT}/database/songs`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(inputArray),
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(e => Promise.reject(e))
        }
        else if (res.status !== 201){
          swal("Error", `Post failed: status ${res.status}`, "error")
          return res.json().then(e => Promise.reject(e))
        }
        else {
          return res.json()
        }
      })
  }
}

export default DatabaseApiService
