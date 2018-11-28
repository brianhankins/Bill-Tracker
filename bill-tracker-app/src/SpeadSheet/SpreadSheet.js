import React, { Component } from 'react'
import BootstrapTable from 'react-bootstrap-table-next'
import cellEditFactory from 'react-bootstrap-table2-editor'
import { Button } from 'react-bootstrap'
import paidIcon from '../Images/paid-icon.jpg'
import '../SpeadSheet/SpreadSheet.css'
import { TestData } from './TestData'


class Table extends Component {
  constructor(props) {
    super(props);

    this.toggleTableLock = this.toggleTableLock.bind(this)
    this.markAsPaid = this.markAsPaid.bind(this)

    this.state = {
      isLocked: true,
      isPaid: [],
      allRows: [],
      currentSelectedRows: []
    }
  }

  componentWillMount() {
    this.updateAllRowsState()
  }

  updateAllRowsState() {
    let tempArray = []

    TestData.map(obj => (tempArray.push(parseInt(obj.id))))

    this.setState(prevState => ({
      allRows: [...prevState.allRows, tempArray]
    }), () => console.log('AllRows: ', this.state.allRows))
  }

  toggleTableLock() {
      this.setState(prevState => ({
        isLocked: !prevState.isLocked
      }))
  }

  markAsPaid() {
    console.log('Mark as paid clicked')
  }

  isNonSelectable() {
    return this.state.isLocked ? this.state.allRows[0] : []
  }

  paidImageColumn(cell, row, rowIndex, formatExtraData) {
    return (
      cell ? <img src={formatExtraData.paid} alt='paid icon' /> : ''
    )
  }

  canEditData() {
      return this.state.isLocked ? cellEditFactory({ mode: '' }) : cellEditFactory({ mode: 'click' })
  }

  updateSelectedRows(rowId, selected) {
    if (selected) {
      this.setState(prevState => ({
        currentSelectedRows: [...prevState.currentSelectedRows, rowId]
      }), () => console.log('Selected-CurrentSelectedRows: ', this.state.currentSelectedRows))
    }
    else {
      this.setState(prevState => ({
        currentSelectedRows: prevState.currentSelectedRows.filter(elementId => elementId !== rowId)
      }), () => console.log('Not Selected-CurrentSelectedRows: ', this.state.currentSelectedRows))
    }
    
    return true
  }

  render() {
    const columns = 
    [{
      dataField: 'id',
      text: 'id',
      hidden: true
    },{
      dataField: 'billName',
      text: 'Bill Name'
    },{
      dataField: 'amountDue',
      text: 'Amount Due'
    },{
      dataField: 'dueDate',
      text: 'Due Date'
    },{
      dataField: 'totalAmountOwed',
      text: 'Total Amt Owed'
    },{
      dataField: 'notes',
      text: 'Notes'
    },{
      dataField: 'isPaid',
      text: 'Paid',
      formatter: this.paidImageColumn,
      formatExtraData: {
          paid: paidIcon
      },
      headerStyle: { width: '4vw' },
      editable: false
    }]

    const selectRow = {
      mode: 'checkbox',
      clickToEdit: true,
      nonSelectable: this.isNonSelectable(),
      onSelect: (row, isSelect, rowIndex, e) => {
        return this.updateSelectedRows(row.id, isSelect)
      },
      onSelectAll: (isSelect, rows, e) => {
        rows.map(row => this.updateSelectedRows(row.id, isSelect))
      }
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

        <p>Current Table Status: {this.state.isLocked ? 'Locked' : 'Unlocked'}</p>
        
        <BootstrapTable
          keyField='id'
          bootstrap4={ true }
          hover={ true }
          data={ TestData }
          columns={ columns }
          selectRow = { selectRow }
          cellEdit={ this.canEditData() }
        />

        <Button
          bsStyle='info'
          className='markAsPaidButton' 
          onClick={this.markAsPaid}
          disabled={this.state.isLocked}
        >
        Mark As Paid
        </Button>
      </div>
    );
  }
}

export default Table;
