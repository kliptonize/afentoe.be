import React from 'react';
import {mdiPlus} from '@mdi/js';

import Icon from './icon';

class TextAction extends React.Component {
	submit(){
		this.props.callback({submitted: "a textfield"});
	}

  	render() {
    	return (
      	<p>
      		Something else
      	</p>
    	);
  	};
}

export default TextAction;