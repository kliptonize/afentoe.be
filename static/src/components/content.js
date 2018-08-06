import React from 'react';
 
import NumberAction from './fragments/number.action';
import TextAction from './fragments/text.action';
import DateAction from './fragments/date.action';

class Content extends React.Component {
 constructor(){
    super();

    this.state = {
      subject: "Michiel",
      verb: "vloekt",
      description: "Hoe vaak heeft Michiel ondertussen al gevloekt?",
      type: "number",
      data: "1204"
    }
  }

  update(data){
  	console.log(data);
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
          	<p>{this.state.data}</p>
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