import React from "react";
import { connect } from "dva";

class Bigpic extends React.Component{
	constructor(props){
		super(props)

		this.wenjianming = "";

		this.src = "";
	}
	//看数据是否准备好
	shouldComponentUpdate({picshow}){
		
		if(!picshow.data[picshow.nowcolor]) return false;
		var wenjianming = picshow.data[picshow.nowcolor][picshow.nowalbum][picshow.nowpicidx];

		this.src = `/car_images/${picshow.car}/${picshow.nowcolor}/${picshow.nowalbum}/${wenjianming}`
		return true;
	}
	render(){

		return (
			<div>
				<img src={this.src} alt=""/>
				<div className="leftBtn" onClick={()=>this.props.dispatch({"type" : "picshow/goprev"})}></div>
				<div className="rightBtn" onClick={()=>this.props.dispatch({"type" : "picshow/gonext"})}></div>
			</div>
		)
	}
}

export default connect(({picshow})=>{
	return {
		picshow
	}
})(Bigpic)