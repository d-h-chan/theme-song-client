import React, { Component } from 'react';
import Context from '../ContextManagement/Context.js'
import Loader from 'react-loader-spinner'


class LoadingIndicator extends Component {
  static contextType = Context;

  render() {
    return (
      <>
        {this.context.isLoading &&
          <Loader
          type="Rings"
          color="#00B2FF"
          height={100}
          width={100}
          timeout={7000} //7 secs
       />
        }
      </>
    );
  }
}

export default LoadingIndicator;