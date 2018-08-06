import React from 'react';

class DateAction extends React.Component {
	submit(){
		this.props.callback({submitted: "a date"});
	}

  	render() {
    	return (
      	<p>
        	<button onClick={() => this.submit()}>Click here</button>
      	</p>
    	);
  	};
}

export default DateAction;