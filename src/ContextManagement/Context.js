import React from 'react'

//set the defaults
const Context = React.createContext({
  setSearchPageResults: () => {},
  setAddPageResults: () => {},
  setArtists: () => {},
  setCheckboxState: () => {},
  createCheckboxState: () => {},
});

export default Context;
