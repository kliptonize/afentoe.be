import React from 'react';
import {mdiPlus} from '@mdi/js';

import Icon from './icon';

class NumberAction extends React.Component {
	submit(){
		this.props.callback({action: "add"});
	}

  	render() {
    	return (
          <div className="action__group pull--right">
            <button onClick={() => this.submit()}>
              <Icon path={mdiPlus} />
            </button>
            <span onClick={() => this.submit()}>Add one more</span>
          </div>
    	);
  	};
}

export default NumberAction;