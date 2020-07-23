import React, { Component } from "react";
import {VictoryBar, VictoryChart, VictoryGroup} from 'victory';
export default class PopUp extends Component {
state = {
    mydata: this.props.data,
    avg: this.props.averg,
}
handleClick = () => {
    this.props.toggle();
};

render() {
    const {mydata, avg}=this.state;
    console.log(avg.energy);
return (
    
    <div className="modal">
    <div className="modal_content">
    <span className="close" onClick={this.handleClick}>&times;    
    </span>
    <VictoryChart
    >

<VictoryGroup offset={20}
    colorScale={"qualitative"}
    categories={{ x: ["Dance", "Energy", "Valence"]}}
>
    <VictoryBar
    data={[{ x: "Dance", y: mydata.danceability }, { x: "Energy", y: mydata.energy }, { x: "Valence", y: mydata.valence }]}
    />
    <VictoryBar
    data={[{ x: "Dance", y: avg.dancebility }, { x: "Energy", y: avg.energy }, { x: "Valence", y: avg.valence }]}
    />
</VictoryGroup>
</VictoryChart>
    </div>
</div>
);
}
}