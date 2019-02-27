import React, { Component } from 'react';
import * as RecordsAPI from '../utils/RecordsAPI';
export default class RecordForm extends Component {
    constructor(props){
        super(props);
        this.state={
            date: "",
            title: "",
            amount: ""
        }

    }
    handleChange(e){
        let name, obj;
        name = e.target.name;
        this.setState((
            obj = {},
                obj["" + name] = e.target.value,
                obj
        ))
    }
    valid() {
        return this.state.date && this.state.title && this.state.amount
    }
    handleSubmit(event){
        event.preventDefault();
        RecordsAPI.create({date:this.state.date,title:this.state.title,amount:Number.parseInt(this.state.amount,0)}).then(
            response =>{
                this.props.addRecord(response.data)
                this.setState({
                    date: "",
                    title: "",
                    amount: ""
                })
            }
        ).catch(
            error=>console.log(error.message)
        )
    }
    render() {
        return (
            <form className="form-inline mb-3" onSubmit={this.handleSubmit.bind(this)}>
                <div className="form-group mr-1" >
                    <input type="date" className="form-control" onChange={this.handleChange.bind(this)} placeholder="Date" name="date" value={this.state.date} />
                </div>
                <div className="form-group mr-1" >
                    <input type="text" className="form-control" onChange={this.handleChange.bind(this)} placeholder="Title" name="title" value={this.state.title} />
                </div>
                <div className="form-group mr-1" >
                    <input type="number" className="form-control" onChange={this.handleChange.bind(this)}  placeholder="Amount" name="amount" value={this.state.amount} />
                </div>
                <button type="submit" className="btn btn-primary" disabled={!this.valid()}>Create Record</button>
            </form>
        );
    }
}

