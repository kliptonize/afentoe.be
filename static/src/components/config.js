import React from 'react';
import {mdiTextbox, mdiCounter, mdiTimer, mdiArrowLeft, mdiContentSave} from '@mdi/js';
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
      type: ""
    };

    this.handleInput = this.handleInput.bind(this);

    socket.on('config.updated', (data) => {
      console.debug("Oui", data);
      this.setState({
        "subject": data.subject,
        "verb": data.verb,
        "description": data.description,
        "type": data.type,
        "id": data.id,
      });
    });

    
    //Something went wrong
    socket.on('config.error', (error) => {
      console.error(error);
    });
  }

  handleInput({target}){
    var temp = {};
    temp[target.name] = target.value;
    this.setState(temp);
  }

  submit(){
    console.log(this.state);
    socket.emit('config.edit', this.state);

    //Navigate to our own view
    //window.location = `//${window.location.hostname}:3000`;
  }

  historyGoBack(){
    window.history.back();
  }

  render() {
    return (
      <main class="main--wide config">
      <div>
        <header class="tabs">
          <ul>
            <li class="tab--active">Configuratie</li>
          </ul>
        </header>
        <article class="panel__config">
          <form>
            <p><i>Hier kan je je pagina aanmaken, of bewerken.</i></p>
            <fieldset class="fieldset--half">
              <label>Onderwerp</label>
              <input type="text" name="subject" placeholder="Bv. Sander" value={this.state.subject} onChange={this.handleInput} />
            </fieldset>
            <fieldset class="fieldset--half">
              <label>Actie</label>
              <input type="text" name="verb" placeholder="Bv. deployed" value={this.state.verb} onChange={this.handleInput} />
            </fieldset>
            <fieldset class="fieldset--full">
              <label>Beschrijving</label>
              <input type="text" name="description" placeholder="Bv. Hoe vaak heeft Sander al gedeployed?" value={this.state.description} onChange={this.handleInput} />
            </fieldset>
            <fieldset class="fieldset--full">
              <p>Kies een type pagina</p>
              <div>
                <input type="radio" name="type" id="textbox" value="text" checked={this.state.type === "text"} onChange={this.handleInput} />
                <label for="textbox">
                  <span class="option__title">Textveld</span><br/>
                  <span class="option__description">Een aanpasbaar invoerveld</span>
                  <span class="option__icon">
                    <Icon path={mdiTextbox} />
                  </span>
                </label>
              </div>
              <div>
                <input type="radio" name="type" id="counter" value="number" checked={this.state.type === "number"} onChange={this.handleInput} />
                <label for="counter">
                  <span class="option__title">Counter</span><br/>
                  <span class="option__description">Elke keer eentje omhoog</span>
                  <span class="option__icon">
                    <Icon path={mdiCounter} />
                  </span>
                </label>
              </div>
              <div>
                <input type="radio" name="type" id="timer" value="date" checked={this.state.type === "date"} onChange={this.handleInput} />
                <label for="timer">
                  <span class="option__title">Timer</span><br/>
                  <span class="option__description">De tijd tot / sinds </span>
                  <span class="option__icon">
                    <Icon path={mdiTimer} />
                  </span>
                </label>
              </div>
            </fieldset>
          </form>
        </article>
        <footer class="has--top-border">
          <button onClick={() => this.historyGoBack()}>
            <Icon path={mdiArrowLeft} />
            <span>Terug</span>
          </button>
          <button class="primary" onClick={() => this.submit()}>
            <span>Opslaan</span>
            <Icon path={mdiContentSave} />
          </button>
        </footer>
      </div>
    </main>
    );
  };
}

export default Config;