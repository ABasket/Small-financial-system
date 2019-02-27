import React, { Component } from 'react';
import Record from './Record';
import * as RecordsAPI from '../utils/RecordsAPI';
import RecordForm from './RecordForm'
import AmountBox from "./AmountBox";
//import {getJSON} from 'jquery';
class Records extends Component {
  constructor() {
    super();
    this.state = {
      error: null,
      isLoaded: false,
      records: []
    }
  }

  componentDidMount() {
      RecordsAPI.getAll().then(
        response => this.setState({
          records: response.data,
          isLoaded: true
        })
    ).catch(
        error => this.setState({
          isLoaded: true,
          error
        })
    )
  }
    updateRcord(record,data) {
        const RecordsIndex = this.state.records.indexOf(record);
        console.log(record,data,this.state.records);

        const newRecords =  this.state.records.map((item, index) => {
            if (index !== RecordsIndex) {
                // This isn't the item we care about - keep it as-is
                return item
            }

            // Otherwise, this is the one we want - return an updated value
            return {
                ...item,
                ...data
            }
        })
        this.setState({
            records:newRecords
        })
    }
    DeleteRecord(record){
        const RecordsIndex = this.state.records.indexOf(record);
        const newRecords = this.state.records.filter((item, index) => index !== RecordsIndex)
        this.setState({
            records:newRecords
        })
    }
    NewRecord(record){
      console.log(this.state.records);
        this.setState({
            error: null,
            isLoaded: true,
            records: [
                ...this.state.records,
                record
            ]
        })
    }
    credits() {
        let credits = this.state.records.filter((record) => {
            return record.amount >= 0;
        })

        return credits.reduce((prev, curr) => {
            return prev + Number.parseInt(curr.amount, 0)
        }, 0)
    }

    debits() {
        let credits = this.state.records.filter((record) => {
            return record.amount < 0;
        })

        return credits.reduce((prev, curr) => {
            return prev + Number.parseInt(curr.amount, 0)
        }, 0)
    }

    balance() {
        return this.credits() + this.debits();
    }
  render() {
    const {error, isLoaded, records} = this.state;
    let recordsComponent ;
    if (error) {
        recordsComponent = <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        recordsComponent = <div>Loading...</div>;
    } else {
        recordsComponent =  (

            <table className="table table-bordered">
              <thead>
              <tr>
                <th>Date</th>
                <th>Title</th>
                <th>Amount</th>
              </tr>
              </thead>
              <tbody>
              {records.map((record) => <Record key={record.id} record={record} handleDeleteRecord={this.DeleteRecord.bind(this)} handleEditRcord={this.updateRcord.bind(this)}/>)}
              </tbody>
            </table>
      )}
      return (
        <div>
            <h2>Records</h2>
            <div className="row mb-3">
                <AmountBox text="Credits" type="success" amount={this.credits()} />
                <AmountBox text="Debits" type="danger" amount={this.debits()} />
                <AmountBox text="Balance" type="info"  amount={this.balance()} />
            </div>
            <RecordForm addRecord={this.NewRecord.bind(this)}/>
            {recordsComponent}
        </div>
      )
  }

}

export default Records;