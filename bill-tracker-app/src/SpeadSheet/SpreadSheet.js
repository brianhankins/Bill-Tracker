import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next'
import cellEditFactory from 'react-bootstrap-table2-editor'
import { Button } from 'react-bootstrap'
import '../SpeadSheet/SpreadSheet.css'
import { Columns } from './Columns'
import { TestData } from './TestData'


class Table extends Component {
  constructor(props) {
    super(props);

    this.toggleTableLock = this.toggleTableLock.bind(this)
    this.markAsPaid = this.markAsPaid.bind(this)

    this.state = {
      isLocked: true,
      allRows: [],
      isPaid: [],
      currentSelectedRows: []
    }
  }

  componentWillMount() {
    this.updateAllRowsArr()
  }

  updateAllRowsArr() {
    let tempArray = []

    for (var id in TestData) {
      tempArray.push(parseInt(id))
    }

    this.setState(prevState => ({
      allRows: [...prevState.allRows, tempArray]
    }))
  }

  toggleTableLock() {
    this.state.isLocked ?
      this.setState(prevState => ({
        isLocked: !prevState.isLocked,
        allRows: []
      }))
      :
      this.setState(prevState => ({
        isLocked: !prevState.isLocked
      }), () => this.updateAllRowsArr())
  }

  markAsPaid() {
    console.log('Mark as paid clicked')
  }


  render() {
    const cellEdit = cellEditFactory({
      mode: 'click',
      blurToSave: true,
      nonEditableRows: this.allRows
    });

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
          columns={ Columns }
        />

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
