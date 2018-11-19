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

    this.toggleTableLock = this.toggleTableLock.bind(this)
    this.nonEditRows = this.nonEditRows.bind(this)
    this.markAsPaid = this.markAsPaid.bind(this)
    this.onRowClick = this.onRowClick.bind(this)

    this.state = {
      isLocked: true,
      allRows: []
    }
  }

  componentWillMount() {
    let tempArray = []

    for (var id in TestData) {
      tempArray.push(parseInt(id))
    }

    this.setState(prevState => ({
      allRows: [...prevState.allRows, tempArray]
    }))
  }

  toggleTableLock() {
    this.setState(prevState => ({
      isLocked: !prevState.isLocked
    }))
  }
  
  nonEditRows() {
    return this.state.isLocked ? this.state.allRows[0] : []   
  }

  onRowClick(row, isSelected) {
    console.log('clicked', isSelected);

    if (this.state.isLocked) {
      isSelected ? selectedRows.push(row.id) : selectedRows = selectedRows.filter((id) => id !== row.id)
    }

    console.log(selectedRows)
  }

  markAsPaid() {
    
  }

  render() {
    const cellEdit = {
      mode: 'click',
      nonEditableRows: this.nonEditRows
    }
    
    const selectRow = {
      mode: 'checkbox',
      selected: selectedRows,
      bgColor: 'red',
      clickToSelect: true
    }

    const options = {
      onRowClick: this.onRowClick
    }

    return (
      <div>
        <Button 
          bsStyle={this.state.isLocked ? 'success' : 'danger'} 
          className='lockButton' 
          onClick={this.toggleTableLock}
        >
          {this.state.isLocked ? 'UnLock' : 'Lock'}
        </Button>
        
        <h6>Table Status: {this.state.isLocked ? 'locked' : 'unlocked'}</h6>
        
        <BootstrapTable data={ TestData } version='4'
          cellEdit={ cellEdit }
          selectRow={ selectRow }
          options= { options }
        >
          <TableHeaderColumn dataField='id' isKey hidden>ID</TableHeaderColumn>
          <TableHeaderColumn dataField='billName'>Name</TableHeaderColumn>
          <TableHeaderColumn dataField='amountDue'>Amount Due</TableHeaderColumn>
          <TableHeaderColumn dataField='dueDate'>Due Date</TableHeaderColumn>
          <TableHeaderColumn dataField='totalAmountOwed'>Total Amt Owed</TableHeaderColumn>
          <TableHeaderColumn dataField='notes'>Notes</TableHeaderColumn>
        </BootstrapTable>
        
        <Button
          bsStyle='info'
          className='markAsPaidButton' 
          onClick={this.markAsPaid}
        >
        Mark As Paid
        </Button>
      </div>
    );
  }
}

export default Table;
