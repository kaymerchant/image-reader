import React, { Component } from 'react';
import ComputerVision from '../src/ComputerVision'

class App extends Component {
  componentDidMount () {
    document.title = "Image Reader"
  }
  render () {
    return (
      <div>
        <ComputerVision/>
      </div>
    );
  }
}

export default App;
