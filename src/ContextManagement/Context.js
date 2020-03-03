import React from 'react'

//set the defaults
const Context = React.createContext({
  setSearchPageResults: () => {},
  setAddPageResults: () => {},
  setArtists: () => {},
  setCheckboxState: () => {},
  createCheckboxState: () => {},
  setIsLoading: () => {}
});

export default Context;
