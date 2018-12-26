import React from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';
require('dotenv').config();

class App extends React.Component {
  onSearchSubmit(term) {
    console.log(process.env);
    axios.get('https://api.unsplash.com/search/photos', {
      params: {
        query: term
      },
      headers: {
        Authorization: `Client-ID ${process.env.YOUR_ACCESS_KEY}`
      }
    });
  }

  render() {
    return (
      <div className="ui container" style={{ marginTop: '10px' }}>
        <SearchBar onSubmit={this.onSearchSubmit} />
      </div>
    );
  }
}

export default App;
