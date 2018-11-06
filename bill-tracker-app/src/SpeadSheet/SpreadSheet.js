import React, { Component } from 'react';
import {BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Button } from 'react-bootstrap'
import '../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import '../SpeadSheet/SpreadSheet.css'
import { TestData } from './TestData'

class Table extends Component {
  constructor(props) {
    super(props);

    this.lockButtonText = this.lockButtonText.bind(this);

    this.state = {
      isLocked: true,
    }
  }

  lockButtonText() {
    this.setState(preState => ({
      isLocked: !preState.isLocked
    }))
  }

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
        <Button 
          bsStyle={this.state.isLocked ? 'danger' : 'success'} 
          className='buttonPad' 
          onClick={this.lockButtonText}
        >
          {this.state.isLocked ? 'Lock' : 'Unlock'}
        </Button>

        <BootstrapTable data={ TestData } version='4'
          expandableRow={ this.isExpandableRow }
          expandComponent={ this.expandComponent }
          selectRow={ selectRowProp }
        >
          <TableHeaderColumn dataField='id' isKey hidden>ID</TableHeaderColumn>
          <TableHeaderColumn dataField='billName'>Name</TableHeaderColumn>
          <TableHeaderColumn dataField='amountDue'>Amount Due</TableHeaderColumn>
          <TableHeaderColumn dataField='dueDate'>Due Date</TableHeaderColumn>
          <TableHeaderColumn dataField='totalAmountOwed'>Total Amt Owed</TableHeaderColumn>
          <TableHeaderColumn dataField='notes'>Notes</TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}

const selectRowProp = {
  mode: 'checkbox',
  bgColor: 'rgb(135, 198, 47)'
}

export default Table;
