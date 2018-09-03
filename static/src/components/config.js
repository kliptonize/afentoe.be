import React from 'react';
import {mdiCalendar, mdiCounter, mdiCursorText} from '@mdi/js';
import openSocket from 'socket.io-client';

import Icon from './fragments/icon';

// Open socket connection
const socket = openSocket(`//${window.location.hostname}:3000`);

class Config extends React.Component {
  constructor(){
    super();

    this.state = {
      subject: "",
      verb: "",
      description: "",
      type: "",
      id: ""
    };

    this.handleInput = this.handleInput.bind(this);

    socket.on('data.update', (data) => {
      this.setState({
        "subject": data.subject,
        "verb": data.verb,
        "description": data.description,
        "type": data.type,
        "id": data.id,
      });
    });
  }

  handleInput({target}){
    var temp = {};
    temp[target.name] = target.value;
    this.setState(temp);
  }

  submit(){
    socket.emit('config.edit', this.state);

    //Navigate to our own view
    window.location = `//${window.location.hostname}:3000`;
  }

  render() {
    return (
      <section>
        <div className="box box--white box--center">
          <section className="text--center">
            <h1>Configuration</h1>
          </section>
          <section>
            <div className="half">
              <fieldset>
                <label>Subject</label>
                <input type="text" placeholder="Subject of your mockery" name="subject" value={this.state.subject} onChange={this.handleInput} />
              </fieldset>
              <fieldset>
                <label>Verb</label>
                <input type="text" placeholder="What does your subject always do?" name="verb" value={this.state.verb} onChange={this.handleInput} />
              </fieldset>
            </div>
            <div className="half">
              <fieldset>
                <label>Type of mockery</label>
                  <div className="option">
                    <Icon path={mdiCursorText} size="24"/>
                    <input type="radio" value="text" name="type" checked={this.state.type === "text"} onChange={this.handleInput} />
                  </div>
                  <div className="option">
                    <Icon path={mdiCounter} />
                    <input type="radio" value="number" name="type" checked={this.state.type === "number"} onChange={this.handleInput}/>
                  </div>
                  <div className="option">
                    <Icon path={mdiCalendar} />
                    <input type="radio" value="date" name="type" checked={this.state.type === "date"} onChange={this.handleInput}/>
                  </div>
              </fieldset>
            </div>
            <div>
              <fieldset>
                <label>Description</label>
                <input type="text" placeholder="What would you like displayed?" name="description" value={this.state.description} onChange={this.handleInput} />
              </fieldset>
            </div>
            <div className="text--right">
              <button onClick={() => this.submit()}>
                Save
              </button>
            </div>
          </section>
          <section>
            <i>Preview</i>
          </section>
        </div>
      </section>
    );
  };
}

export default Config;