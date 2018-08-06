import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';

// Import visual style
import './index.css';

// Import necessary components
import Header from './components/core/header';
import Footer from './components/core/footer';
import Config from './components/config';
import Content from './components/content';

// Render main component based on ?config in url
var urlParams = new URLSearchParams(window.location.search);

if(urlParams.has('config')){
	// Load the page with config-view
	ReactDOM.render(
		<Fragment>
			<Header />
			<Config />
			<Footer />
		</Fragment>,
	  document.getElementById('root')
	);
}else{
	// Load page with actual afentoe.be-content
	ReactDOM.render(
		<Fragment>
			<Header />
			<Content />
			<Footer />
		</Fragment>,
	  document.getElementById('root')
	);
}