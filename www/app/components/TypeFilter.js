import React from "react";
import { connect } from "dva";
import brands from "../api/brands.js"

class TypeFilter extends React.Component {
    constructor(props){
        super(props);
		
		this.list = ["轿车","SUV","越野车","MPV","混动车"]
    }
	showtypelist(){
		return this.list.map((item, index)=>{
			return <a key={index} onClick={()=>{this.props.dispatch({
				"type" : "carsearch/settag",
				"payload" : {
					"tagkey" : "type" ,
					"tagvalue" : item
				}
			})}}>{item}</a>
		})
	}

    render(){
        return (
        	<div>
        		<div className="row selectrow">
					<div className="col-xs-1">
						类型：
					</div>
					<div className="col-xs-11">
						{this.showtypelist()}
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
})(TypeFilter);