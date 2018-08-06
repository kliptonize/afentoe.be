import React from 'react';
import openSocket from 'socket.io-client';

import NumberAction from './fragments/number.action';
import TextAction from './fragments/text.action';
import DateAction from './fragments/date.action';

// Open socket connection
const socket = openSocket(`//${window.location.hostname}:3000`);

class Content extends React.Component {
 constructor(){
    super();

    this.state = {
      subject: "Michiel",
      verb: "vloekt",
      description: "Hoe vaak heeft Michiel ondertussen al gevloekt?",
      type: "number",
      value: 1204,
      diff: 0
    }

    this.update = this.update.bind(this);

 	socket.on('data.update', (data) => {
 		// Catch difference, and show animation where necessary
      this.setState({
        data,
      });
    });
  }

  update(data){
  	// Send update to server
  	socket.emit('data.edit', data);
  }



  render() {
  	var action = null;
  	switch(this.state.type){
  		case "number":
  			action = <NumberAction callback={this.update}/>
  			break;
  		case "text":
  		 	action = <TextAction callback={this.update}/>
  		 	break;
  		case "date":
  		 	action = <DateAction callback={this.update}/>
  		 	break;
  		default:
  			action = "<br/>";
  			break;
  	}

    return (
      <section>
        <div className="box box--center box--white">
          <section className="text--center">
            <h1>{this.state.subject} {this.state.verb}</h1>
          </section>
          <section className="text--center">
          	<p>{this.state.description}</p>
          	<p data-diff={this.state.diff} className="value">{this.state.value}</p>
          </section>
          <section>
          	{action}
          </section>
         </div>
      </section>
    );
  };
}

export default Content;