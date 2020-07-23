import React, { Component } from "react";
import PopUp from "./PopUp"; 
export default class scroll extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        seen: false,
        id: '',
    };
    togglePop = () => {
    this.setState({
        seen: !this.state.seen,
        id: this.props.id,
        bad: this.props.avg
        });
    };
    render() {
    const { seen, id, bad} = this.state;
    console.log(this.props.avg);
    return (
    <div>
        {this.state.seen ? <PopUp 
        toggle={this.togglePop} 
        data={this.props.auth} 
        averg={this.props.avg} /> : null}
    <div className="card--content">
        <img src={this.props.url} className="card-img-top"alt={"no"} onClick={this.togglePop}/>
        <h5 className="card-body">{this.props.name}</h5>
        <h5 className="card-body">{this.props.artist}</h5>
        </div>
        
    </div>);
    }}
