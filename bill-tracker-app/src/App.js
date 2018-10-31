import React, { Component } from 'react';
import Table from './SpeadSheet/SpreadSheet';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  render() {
    return (
      <div>
        <header>Bill Tracker</header>
        <Table />
      </div>
    );
  }
}

export default App;
