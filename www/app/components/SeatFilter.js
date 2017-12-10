import React from "react";
import { connect } from "dva";
import { Checkbox , Button } from "antd";
import brands from "../api/brands.js"

class SeatFilter extends React.Component {
    constructor(props){
        super(props);

        this.state = {
			options : [
				{"number" : "2" , "checked" : this.props.carsearch.filter.seat && this.props.carsearch.filter.seat.contains("2")},
				{"number" : "4" , "checked" : this.props.carsearch.filter.seat && this.props.carsearch.filter.seat.contains("4")},
				{"number" : "5" , "checked" : this.props.carsearch.filter.seat && this.props.carsearch.filter.seat.contains("5")},
				{"number" : "7" , "checked" : this.props.carsearch.filter.seat && this.props.carsearch.filter.seat.contains("7")},
				{"number" : "更多", "checked"  : this.props.carsearch.filter.seat && this.props.carsearch.filter.seat.contains("更多")}
			]
        }
    }
    changeHandler(e,number){
		this.setState({
			"options" : this.state.options.map((item, index)=>{
				if(item.number != number){
					return item;
				}else{
					return {"number" : number, "checked" : e.target.checked}
				}
			})
		})
    }

	showseatlist(){
		 return this.state.options.map((item, index)=>{
			return <Checkbox key={index}  checked={item.checked} onChange={(e)=>{this.changeHandler(e, item.number)}}>{item.number}</Checkbox>
		})

	}

	submit(){
		var seat = [];
		this.state.options.forEach(function(item){
			if(item.checked){
				seat.push(item.number)
			}

		})
		// console.log(seat)
		this.props.dispatch({"type" : "carsearch/settag" , payload : {"tagkey" : "seat" , "tagvalue" : seat}});
	}

    render(){
        return (
        	<div>
        		<div className="row selectrow">
					<div className="col-xs-1">
						座位数：
					</div>
					<div className="col-xs-11">
						{this.showseatlist()}
						<Button onClick={this.submit.bind(this)}>确定</Button>
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
})(SeatFilter);