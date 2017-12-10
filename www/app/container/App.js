import React from "react";
import { connect } from "dva";
import { Router, Route } from 'dva/router';
import CarSearchBox from "./CarSearchBox.js";


class App extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
    	return (
			<div>
				<Router >
					<div>
						<Route path="/" component={CarSearchBox} />
					</div>
			    </Router>
			</div>
    	)
    }
}

export default App;