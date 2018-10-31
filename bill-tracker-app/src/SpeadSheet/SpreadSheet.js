import React, { Component } from 'react';
import {BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import '../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

var products = [{
  id: 1,
  name: "Product1",
  price: 120
}, {
  id: 2,
  name: "Product2",
  price: 89
}];

class Table extends Component {
  render() {
    return (
      <div>
        <BootstrapTable data={ products } version='4' striped hover condensed>
          <TableHeaderColumn dataField='id' isKey>Product ID</TableHeaderColumn>
          <TableHeaderColumn dataField='name'>Product Name</TableHeaderColumn>
          <TableHeaderColumn dataField='price'>Product Price</TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}

export default Table;
