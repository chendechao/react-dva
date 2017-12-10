import React from "react";
import { connect } from "dva";
import brands from "../api/brands.js"
import { Slider, Button } from "antd";

class PriceFilter extends React.Component {
    constructor(props){
        super(props);

        this.submit = this.submit.bind(this);

        this.value = [2, 600]

    }
	
	//确定按钮
	submit(){
		this.props.dispatch({"type" : "carsearch/settag" , payload : {"tagkey" : "price" , "tagvalue" : this.value}});
	}
	
	changeHandler(value){
		this.value = value;
	}

    render(){
    	
        return (
        	<div>
				<div className="row selectrow">
					<div className="col-xs-2">
						价格（万元）：
					</div>
					<div className="col-xs-6">
						<Slider onChange={(value)=>{this.changeHandler(value)}} range min={this.value[0]} max={this.value[1]} defaultValue={[2, 600]} />
					</div>
					<div className="col-xs-4">
						<Button onClick={this.submit}>确定</Button>
					</div>
				</div>
        	</div>
        )
    }
}

export default connect(({carsearch})=>{
    return {
        carsearch
    }
})(PriceFilter);