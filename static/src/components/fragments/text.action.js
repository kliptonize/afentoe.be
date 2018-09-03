import React from 'react';
import {mdiSend} from '@mdi/js';

import Icon from './icon';

class TextAction extends React.Component {
	submit(){
		this.props.callback({submitted: "a textfield"});
	}

  	render() {
    	return (
          <div className="action__group">
            <input type="text" placeholder="What did Michiel do this time?" />
            <button onClick={() => this.submit()}>
              <Icon path={mdiSend} />
            </button>
          </div>
    	);
  	};
}

export default TextAction;