import React from 'react';
import ReactDOM from 'react-dom';
import Moment from 'react-moment';
import openSocket from 'socket.io-client';

// Import visual style
import './index.css';

// Open socket connection
const socket = openSocket(`//${window.location.hostname}:3000`);

function Curse(props) {
  return (
    <div className="curse">
      <Moment fromNow interval={30000}>{props.curse.date}</Moment>
      <h1>{props.curse.name}</h1>
    </div>
  );
}

class Input extends React.Component {
  constructor(){
    super();

    this.state = {
      curse: "",
    }

    this.handleInput = this.handleInput.bind(this);
    this.keyDown = this.keyDown.bind(this);
  }

  handleInput({target}){
    this.setState({
      curse: target.value,
    });
  }

  keyDown({target, keyCode}){
    if(keyCode === 13){
      console.log("Oui");
      this.submit();
    }
  }

  submit(){
    socket.emit('curse.new', this.state.curse);
    this.state.curse = "";
  }

  render() {
    return (
      <div className="input__curse">
        <input type="text" placeholder="Heeft 'm gevloekt?" onChange={this.handleInput} onKeyDown={this.keyDown} value={this.state.curse} />
        <button onClick={() => this.submit()}>+</button>
      </div>
    );
  };
}

class List extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      lastCurse: {
        name: null,
        date: null
      },
      elapsedTimestamp: null,
    };

    // On opening a new connection, the server sends last curse
    // On new curse, update that shit
    socket.on('curse.update', (data) => {
      this.setState({
        lastCurse: data,
      });
      this.tick();
    });
  }

  componentDidMount(){
    var _this = this;
    this.tick();
    this.timer = setInterval(this.tick.bind(this), 1000);
  };

  tick(){
    //Convert to "xx:xx:xx"
    var ts = new Date() - new Date(this.state.lastCurse.date), str = "", divides = [60*60, 60, 1];
    ts = Math.floor(ts/1000);

    for (var j = 0; j < divides.length; j++){ 
      if(Math.floor(ts/divides[j]) > 0){
        str += (Math.floor(ts/divides[j]) < 10 ? "0" + Math.floor(ts/divides[j]) : Math.floor(ts/divides[j]));
      }else{
        str += "00";
      }
      if(j < divides.length-1){
        str += ":";
      }
      ts = ts - Math.floor(ts/divides[j])*divides[j];
    }
    this.setState({elapsedTimestamp: str});
  };

  render() {
    const lastCurse = this.state.lastCurse ? <Curse curse={this.state.lastCurse} /> : <Curse curse="Nog niks gevloekt zeg!" date="Zotjes :o" />;

    return(
      <div>
        <header>
          <h3>Wanneer heeft Michiel hem nog eens laten gaan?</h3>
        </header>
        <section>
          <p className="timestamp">{this.state.elapsedTimestamp}</p>
          {lastCurse}
          <Input />
        </section>
        <footer>
          <p><i>By Koen, foolish enough to try and learn React.js</i> <span role="img" aria-label="hearts">💕</span></p>
        </footer>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <List />,
  document.getElementById('root')
);