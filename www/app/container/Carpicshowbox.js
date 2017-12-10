import React from "react";
import {connect} from "dva";
import Filterbox from "../components/Filterbox.js";
import Smallpicnav from "../components/Smallpicnav.js";
import Bigpic from "../components/Bigpic.js";
import "./Carpicshowbox.less";

class Carpicshowbox extends React.Component{
	constructor(props){
		super(props);
		
		this.props.dispatch({"type" : "picshow/fetchinit" , "car" : props.params.model })
	}
 
	render(){
		return (
			<div className="car_pic_box">
				<div className="bigimg">
					<div className="inner">
						<Bigpic></Bigpic>
					</div>
				</div>
				<div className="rightpart">
					<div className="filterbox">
						<Filterbox></Filterbox>
					</div>
					<div className="cl"></div>
					<br/>
					<div className="smallimgnav">
						<Smallpicnav></Smallpicnav>
					</div>
				</div>
			</div>
		);
	}
}

export default connect(({picshow})=>{
	return {
		picshow
	}
})(Carpicshowbox);