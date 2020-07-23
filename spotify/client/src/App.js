import React, { Component } from 'react';
import './App.css';
import Scroll from "./component/Scroll"; 
function componentmountpart2(param)
    {
        return(fetch(`http://localhost:8888/trying/ids/${param}`).then(res => res.json())
        .catch(error => console.log(error)))
    }

    const shh = [
      {quarter: 1, earnings: 13000},
      {quarter: 2, earnings: 16500},
      {quarter: 3, earnings: 14250},
      {quarter: 4, earnings: 19000}
    ];
    function average(data)
    {
      var sumt = 0;
      var sumd=0;
      var sume=0;
      var sumv=0;
      let len=data.length;
      let item= null;
      for (var i = 0; i < len; i++) {
        item = data[i];
        sumt = item.tempo + sumt;
        sumd= item.danceability+sumd;
        sume= item.energy+sume;
        sumv= item.valence+sumv;
    }
      const averages= {
        tempo: sumt/len,
        dancebility: sumd/len,
        energy: sume/len,
        valence: sumv/len,
      }
      return(averages);
    }
class App extends Component {
  constructor() {
    super();
    const urlParams = new URLSearchParams(window.location.search);
    const isUserAuthorized = urlParams.has('authorized') ? true : false;
    const showing=false;
    const stringy ='';
    const mainid='';
    this.state = {
      isUserAuthorized,
      musicHistory: [],
      auth: [],
      stringy,
      averages: [],
      mainid,
    };
  }
  componentDidMount() {
    const { isUserAuthorized } = this.state;
    if (isUserAuthorized) {
      fetch('http://localhost:8888/history')
        .then(res => res.json())
        .then(data => {
          var result = data.map(function(val) {
            return val.id;
          }).join(',');
          this.setState({
            musicHistory: data,
            stringy: result
          });
        }).catch(error => console.log(error))
    }
  }
    
    buttontime= () => {
      componentmountpart2(this.state.stringy).then(result => {
        console.log(result);
        this.setState({auth: result});
        const avgdata=average(result);
        console.log(avgdata);
        this.setState({averages: avgdata});
      });
    };
  render() {
    const { isUserAuthorized, musicHistory, auth, stringy, averages} = this.state;
    const connectSpotify = isUserAuthorized ? (
      ''
    ) : (
      <a href="http://localhost:8888/login">Connect your Spotify account</a>
    );
  
    return (
      <div className="App">
        <header className="header">
          <p>Top Ten Tracks</p>
          <p>Compare the audio analysis for each of your top tracks with the rest of your music taste! </p>
          <h2>{connectSpotify}</h2>
          {(musicHistory.length!==0)&(auth.length===0) ? <button onClick={this.buttontime}> Click here to get your results! </button>: null}
          {auth.length !== 0 ? <Scroll data={musicHistory} auth={auth} avg={averages}/> : null}
        </header>
      </div>
    );
  }
}
export default App;