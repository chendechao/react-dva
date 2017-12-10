import React from "react";
import { connect } from "dva";
import { Tag } from "antd";

class FilterList extends React.Component {
	constructor(props){
		super(props);
	}
	closeHandler(item){
		this.props.dispatch({"type":"carsearch/deltag",payload:{"keyname":item}});
	}
	showtages(){
		const filter = this.props.carsearch.filter;
		//可能出现的filter罗列出来
		return Object.keys(this.props.carsearch.filter).map((item, index)=>{
			if(item == "country" && filter[item] != "全部"){
				return <Tag closable key={Math.random()} onClose={()=>{this.closeHandler(item)}}>
				【国家】{filter[item]}
				</Tag>
			}else if(item == "brand"){
				return <Tag closable key={Math.random()} onClose={()=>{this.closeHandler(item)}}>【品牌】{filter[item]}</Tag>
			}else if(item == "type"){
				return <Tag closable key={Math.random()} onClose={()=>{this.closeHandler(item)}}>【类型】{filter[item]}</Tag>
			}else if(item == "seat"){
				return <Tag closable key={Math.random()} onClose={()=>{this.closeHandler(item)}}>【座位数】{filter[item].map((number)=>{
					return <span key={Math.random()} >{number}座{"   "}</span>
				})}</Tag>
			}else if(item == "price"){
				return <Tag closable key={Math.random()} onClose={()=>{this.closeHandler(item)}}>【价格】{filter[item][0]}万元 - {filter[item][1]}万元</Tag>
			}else if(item == "date"){
				var start = new Date(filter[item][0]);
				var end = new Date(filter[item][1]);
				return <Tag closable key={Math.random()} onClose={()=>{this.closeHandler(item)}}>【上市日期】{start.getFullYear()}年{start.getMonth() + 1}月{start.getDate()}日 - {end.getFullYear()}年{end.getMonth() + 1}月{end.getDate()}日</Tag>
			}
		})
	}
	render(){
		return (
			<div>
				<div className="row selectrow">
					<div className="col-xs-1">
						筛选：
					</div>
					<div className="col-xs-11">
						{this.showtages()}
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
})(FilterList);