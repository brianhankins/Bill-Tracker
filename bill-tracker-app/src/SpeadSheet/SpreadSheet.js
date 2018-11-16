import React, { Component } from 'react';
import {BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Button } from 'react-bootstrap'
import '../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import '../SpeadSheet/SpreadSheet.css'
import { TestData } from './TestData'

let selectedRows = []

class Table extends Component {
  constructor(props) {
    super(props);

    this.lockRows = this.lockRows.bind(this)
    this.nonEditRows = this.nonEditRows.bind(this)
    this.disableTable = this.disableTable.bind(this)

    this.state = {
      isLocked: true
    }
  }

  componentWillMount() {
    for (var id in TestData) {
      selectedRows.push(parseInt(id))
    }
  }

  lockRows() {
    this.setState(preState => ({ isLocked: !preState.isLocked }), () => this.disableTable())
  }
  
  nonEditRows() {
    return this.state.isLocked ? selectedRows : []   
  }

  handleRowSelect(row, isSelected) {
    isSelected ? selectedRows.push(row.id) : selectedRows = selectedRows.filter((id) => id !== row.id)
  }

  disableTable() {
    let disabledRows = []

    if (this.state.isLocked) {
      TestData.map(row => disabledRows.push(parseInt(row.id)))

      return disabledRows
    }
 
    return disabledRows
  }

  render() {
    const cellEdit = {
      mode: 'click',
      nonEditableRows: this.nonEditRows
    }
    
    const selectRow = {
      mode: 'checkbox',
      onSelect: this.handleRowSelect,
      selected: selectedRows,
      
    }

    const selectRowProp = {
      mode: 'checkbox',
      unselectable: this.disableTable
    }


    return (
      <div>
        <Button 
          bsStyle={this.state.isLocked ? 'success' : 'danger'} 
          className='buttonPad' 
          onClick={this.lockRows}
        >
          {this.state.isLocked ? 'UnLock' : 'Lock'}
        </Button>
        <h6>Table is: {this.state.isLocked ? 'locked' : 'unlocked'}</h6>
        <BootstrapTable data={ TestData } version='4'
          selectRow={ selectRow  }
          cellEdit={ cellEdit }
          selectRowProp={ selectRowProp }
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

export default Table;
