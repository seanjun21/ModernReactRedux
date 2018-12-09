import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props);

    // THIS IS THE ONLY TIME we do direct assignment to this.state
    this.state = { lat: null, errorMessage: '' };

    window.navigator.geolocation.getCurrentPosition(
      position => {
        // We called setState!!!!
        this.setState({ lat: position.coords.latitude });
      },
      err => {
        this.setState({ errorMessage: err.message });
      },
      /* Reason why the Loading div displays indefinitely is
        because the request to the geolocation api hangs on indefinitely on the back-end, giving an error code 3.
        A partial fix is adding a third argument to the getCurrentPosition call '{ timeout: 10000 }'
        which returns a timeout error after 10 seconds of the request being made. */
      { timeout: 10000 }
    );
  }

  // React says we need to define render!!
  render() {
    if (this.state.errorMessage && !this.state.lat) {
      return <div>Error: {this.state.errorMessage}</div>;
    }
    if (!this.state.errorMessage && this.state.lat) {
      return <div>Latitude: {this.state.lat}</div>;
    }

    return <div>Loading!</div>;
  }
}

ReactDOM.render(<App />, document.querySelector('#root'));
