import React from 'react';
import {mdiWrench} from '@mdi/js';

import Icon from './../fragments/icon';

class Header extends React.Component {
  render() {
    return (
      <header>
      	<div className="container">
      		<nav className="logo pull--left">
		        <h3>Afentoe.be</h3>
		    </nav>
		    <nav className="config pull--right text--right">
                <a href="/?config" title="Configurate this page">
                	<Icon path={mdiWrench} />
                </a>
		    </nav>
    	</div>
      </header>
    );
  };
}

export default Header;