import React from "react";
import { connect } from "dva";
import brands from "../api/brands.js"
import { Button , DatePicker} from "antd";
const { RangePicker } = DatePicker;

class DateFilter extends React.Component {
    constructor(props){
        super(props);

        this.time = [];
    }
	showdatelist(){

	}

	submit(){
		// console.log(this.time);
		var start = Date.parse(this.time[0]._d);
		var end = Date.parse(this.time[1]._d);
		this.props.dispatch({"type" : "carsearch/settag" , payload : {"tagkey" : "date" , "tagvalue" : [start , end]}});
	}

    render(){
        return (
        	<div>
        		<div className="row selectrow">
					<div className="col-xs-2">
						上市时间：
					</div>
					<div className="col-xs-6">
						{this.showdatelist()}
    					<RangePicker
					      onChange={(value)=>{this.time = value}}
					      format="YYYY-MM-DD "
					      placeholder={['开始时间', '结束时间']}
					    />
					</div>
					<div className="col-xs-1">
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
})(DateFilter);