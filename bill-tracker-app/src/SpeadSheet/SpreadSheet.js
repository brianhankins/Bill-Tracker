import React, { Component } from 'react';
import {BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import '../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { TestData } from './TestData'

class Table extends Component {
  isExpandableRow(row) {
    return true
  }
  
  expandComponent(row) {
    return (
      <div>Test</div>
    );
  }

  render() {
    return (
      <div>
        <BootstrapTable data={ TestData } version='4' striped hover 
          expandableRow={ this.isExpandableRow }
          expandComponent={ this.expandComponent }
        >
          <TableHeaderColumn dataField='id' isKey hidden>ID</TableHeaderColumn>
          <TableHeaderColumn dataField='billName'>Bill Name</TableHeaderColumn>
          <TableHeaderColumn dataField='amountDue'>Amount Due</TableHeaderColumn>
          <TableHeaderColumn dataField='dueDate'>Due Date</TableHeaderColumn>
          <TableHeaderColumn dataField='totalAmountOwed'>Total Amt Owed</TableHeaderColumn>
          <TableHeaderColumn dataField='notes'>Notes</TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}

export default Table;
