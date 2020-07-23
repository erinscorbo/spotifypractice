import React, { Component } from "react";
import Card from "./Card"; 
export default class Scroll extends Component {
    constructor(props) {
        super(props);
    }
    render() {
    return (
    <div>
    <section className="card">
    {this.props.data.map((e, index)=>
    <div key={e.id}>
        <Card
            id={e.id}
            url={e.url}
            name={e.name}
            artist={e.artist}
            auth={this.props.auth[index]}
            avg={this.props.avg}
        />
    </div>)}
    </section>
    </div>
);
}
}