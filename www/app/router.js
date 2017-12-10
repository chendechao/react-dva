import React from "react";
import App from "./container/App.js";
import { Router, Route } from 'dva/router';
import Carpicshowbox from "./container/Carpicshowbox.js";

function routerConfig({ history }){
	return (
	    <Router history={history}>
	    	<Route path="/" component={App} />
			<Route path="/search" component={App} />
			<Route path="/picshow/:model" component={Carpicshowbox} />
	    </Router>
	);
}

export default routerConfig;