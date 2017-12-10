import React from "react";
import cs from "classnames";
import { connect } from "dva";

class Smallpicnav extends React.Component{
	constructor(props){
		super(props);
		
		//全局数据(照片)
		this.imageslist = [];
		// console.warn(3333,this.props.picshow.data);

		this.nowpage = 0;
	};


	showlist(){
		console.log(this.imageslist);
		// console.log(1,this.props.picshow.data);
		// if(!this.props.picshow.data[this.props.picshow.nowcolor]) return;
		// console.log("五角星" , this.props.picshow.data[this.props.picshow.nowcolor][this.props.picshow.nowalbum]);

		var result = [];	//要返回的数组
		for(let i = 0; i < this.imageslist.length ; i += 6){
			let pagearr = this.imageslist.slice(i , i + 6);
			let _arr = [];
			for(let j = 0 ; j < pagearr.length ; j++){
				_arr.push(<li className={cs({"cur" : i * 6 + j == 0})} key={i * 6 + j}>
					<img src={`/car_images/${this.props.picshow.car}/${this.props.picshow.nowcolor}/${this.props.picshow.nowalbum}/${pagearr[j]}`} /></li>);
			}
			result.push(
				<div className="page" key={i}><ul>{_arr}</ul></div>
			)
		}
		return result;
	}

	showjiujiu(){
		var arr = [];
		var pageamount = Math.ceil(this.imageslist.length / 6);
		for(var i = 0 ; i < pageamount ; i++){
			arr.push(<li key={i} style={{'width': + 330 / pageamount - 10 + "px"}}></li>);
		}
		return <ul>{arr}</ul>
	}

	componentDidMount(){
		//点击jiujiu的事件
		var self = this;
		$(this.refs.jiujiu).delegate("li", "mouseenter" , function(){
			self.nowpage = $(this).index();
			$(self.refs.unit).stop(true).animate({"left" : -330 * self.nowpage}, 300);
			$(this).addClass("cur").siblings().removeClass("cur");
		})
		//点击图片事件
		$(this.refs.unit).delegate("li" , "click" , function(){
			var idx = self.nowpage * 6 + $(this).index();
			self.props.dispatch({"type" : "picshow/changepicidx" , payload : {idx}});
		})
	}
	
	//当有数据更新的时候
	componentDidUpdate(){
		//全局数据中第几张图
		const picidx = this.props.picshow.nowpicidx;
		//这个图片在第几页 向下取整
		const page = parseInt(picidx / 6);
		if(page !=  this.nowpage){
			this.nowpage = page;
			$(this.refs.unit).stop(true).animate({"left" : -330 * this.nowpage},300);
		}
		//改变明亮 要计算余数
		let light = picidx % 6;
		
		$(this.refs.unit).find("li").removeClass("cur");
		$(this.refs.unit).find(".page").eq(page).find("li").eq(light).addClass("cur");
		
		//更改jiujiu
		$(this.refs.jiujiu).find("li").eq(page).addClass("cur").siblings().removeClass("cur");
	}	
	
	//验证视图是否需要更新，当数据完备了(有颜色，有相册的时候) 就可以更新了
	shouldComponentUpdate({picshow}){
		if(!picshow.data[picshow.nowcolor][picshow.nowalbum]) return false;
		this.imageslist = picshow.data[picshow.nowcolor][picshow.nowalbum];
		return true;
	}

	render(){
		return (
			<div>
				<h3>缩略图</h3>
				<div className="unit" ref="unit">
					{this.showlist()}
				</div>
				<div className="cl"></div>
				<div className="jiujiu" ref="jiujiu">
					{this.showjiujiu()}
				</div>
			</div>
		);
	}
}

export default connect(({picshow})=>{
	return {
		picshow
	}
})(Smallpicnav);