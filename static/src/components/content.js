import React from 'react';
import openSocket from 'socket.io-client';
import {mdiClockOutline} from '@mdi/js';

import Icon from './fragments/icon';
import Placeholder from './../images/placeholder.png';

import NumberAction from './fragments/number.action';
import TextAction from './fragments/text.action';
import DateAction from './fragments/date.action';

// Open socket connection
const socket = openSocket(`//${window.location.hostname}:3000`);

class Content extends React.Component {
  constructor(){
    super();

    this.state = {
      actions:[],
    }
    this.state.actions.push({
      subject: "Michiel",
      verb: "vloekt",
      description: "Hoe vaak heeft Michiel ondertussen al gevloekt?",
      type: "number",
      value: 1204,
      diff: 0
    });

    this.update = this.update.bind(this);

   	socket.on('message.created', (data) => {
      // Catch difference, and show animation where necessary
      var temp = this.state.actions;
      temp.push(data);
      this.setState({actions: temp});
    });

    //Something went wrong
    socket.on('message.error', (error) => {
      console.error(error);
    });
  }

  update(data){
  	// Send update to server
  	socket.emit('message.new', data);
  }

  render() {
    //This snippet runs for each action in the state
    var returnValue = [], action = null;

    for(var i = 0; i< this.state.actions.length; i++){
    	var message = null;
    	switch(this.state.actions[i].type){
    		case "number":
          message = <p className="post__body">This is actual action somebody did or was supposed to do or don't. Of course.</p>;
    			action = <NumberAction callback={this.update}/>;
    			break;
    		case "text":
          message = <p className="post__body">This is an actual message</p>;
    		 	action = <TextAction callback={this.update}/>
    		 	break;
    		case "date":
          message = 
            <p className="post__countdown">
              <span>Hoeveel tijd nog tot teamweekend?</span><br/>
              <span className="countdown__icon">
                <Icon path={mdiClockOutline} />  
              </span>
              <span className="countdown__value">
                {this.state.value}
              </span>
            </p>;
    		 	action = "";
    		 	break;
    		default:
          message = "";
    			action = "<br/>";
    			break;
    	}
      returnValue.push(
        <article>
          <div class="post__author">
            <div class="author__image">
              <figure>
                <img src={Placeholder} alt="placeholder" />
              </figure>
            </div>
            <div class="author__meta">
              <h1>{this.state.actions[i].subject}</h1>
              <span class="meta__date">4 days ago</span>
            </div>
          </div>
          {message}
        </article>
      );
    }
    console.log(returnValue);
    return (
      <main>
        <header>
          <span className="meta__timestamp">30 Mar 2018</span>
        </header>
        {returnValue}
        <footer>
          {action}
        </footer>
      </main>
    );
  };
}


export default Content;