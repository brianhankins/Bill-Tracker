import React, { Component } from 'react';
import Table from './SpeadSheet/SpreadSheet';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'

class App extends Component {
  render() {
    return (
      <div>
        <div className="jumbotron">
          <h1 className="display-4">Monthly Bill Pay Tracker</h1>
        </div>
        <Table />
      </div>
    );
  }
}

export default App;
