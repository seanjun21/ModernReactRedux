import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner';

class App extends React.Component {
  constructor(props) {
    super(props);

    // THIS IS THE ONLY TIME we do direct assignment to this.state
    this.state = { lat: null, errorMessage: '' };
  }

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      position => this.setState({ lat: position.coords.latitude }),
      err => this.setState({ errorMessage: err.message })
      /* Reason why the Loading div displays indefinitely is
        because the request to the geolocation api hangs on indefinitely on the back-end, giving an error code 3.
        A partial fix is adding a third argument to the getCurrentPosition call '{ timeout: 10000 }'
        which returns a timeout error after 10 seconds of the request being made. */
      // { timeout: 10000 }
    );
  }

  renderContent() {
    if (this.state.errorMessage && !this.state.lat) {
      return <div>Error: {this.state.errorMessage}</div>;
    }
    if (!this.state.errorMessage && this.state.lat) {
      return <SeasonDisplay lat={this.state.lat} />;
    }

    return <Spinner message="Please accept location request" />;
  }

  // React says we need to define render!!
  render() {
    return <div className="border red">{this.renderContent()}</div>;
  }
}

ReactDOM.render(<App />, document.querySelector('#root'));
