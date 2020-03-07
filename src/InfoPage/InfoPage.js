import React, { Component } from 'react';

class InfoPage extends Component {
  render() {
    return (
      <>
        <h2>Instructions</h2>
        <p>1. From the 'Add' page, search for and save songs you like ( uses the
          <a href="https://genius.com/">Genius Lyrics Api</a>). 
          Search by title or artist in open search, or get the 30 most 
          popular songs from any artists already in the database. 
          Checkmark the songs you want to save and add text labels as desired.
        </p>
        <p>2. From the 'Search' Page, search through songs you saved by keyword. 
          Leaving the input blank will return all saved songs, and searching with an input
          will return all songs with either a matching lyric or keyword
        </p>
        <p>Example: to make the song "Set a Fire" available for search, go to the 'Add'
          page, search for "Set a Fire" in 'Open Search', checkbox the song and click
          'Add to database'. It will then be available from the 'Search' page if you input any
          lyric or label you saved ("fire", "soul", "love", etc)
        </p>

        <h2>Notes</h2>
        <p>* Use of this tool requires internet connection, both to search through saved songs and to add songs from them Genius API</p>
        <p>* If a song is already in the database, saving it again will not update the labels</p>
        <p>* The only way to add a new artist to database is to save a song by that artist (limited by how the genius api works)</p>


      </>
    );
  }
}

export default InfoPage;