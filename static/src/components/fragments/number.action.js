import React from 'react';
import {mdiPlus} from '@mdi/js';

import Icon from './icon';

class NumberAction extends React.Component {
	submit(){
		this.props.callback({action: "add"});
	}

  	render() {
    	return (
    		<div className="text--center">
		      	<a className="action" onClick={() => this.submit()}>
		        	<span>Add another</span>
		        	<Icon path={mdiPlus} />
		      	</a>
		    </div>
    	);
  	};
}

export default NumberAction;