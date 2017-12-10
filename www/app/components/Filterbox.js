import React from "react";
import { connect } from "dva";

class Filterbox extends React.Component{
	constructor(props){
		super(props);
	}

	//上树之后
	componentDidMount(){

		//给albumul中的li添加事件监听
		var that = this;
		$(this.refs.albumul).delegate("li","click",function(){
			const album = $(this).data("album");
			that.props.dispatch({"type" : "picshow/changealbum" , payload : {album}})
		})

		//给colorul中的li添加事件监听
		$(this.refs.colorul).delegate("li","click",function(){
			const color = $(this).data("color");
			that.props.dispatch({"type" : "picshow/changecolor" , payload : {color}})
		})
	}
 	
 	//当props发生任何更改之后
 	componentDidUpdate(nextProp){

 		//让每一个小颜色块改变
		$(this.refs.colorul).find("li").each(function(){
			$(this).css("background-color" , $(this).data("color"));
		});
		
		$(this.refs.colorul).find(`li[data-color=${this.props.picshow.nowcolor}]`).addClass("cur").siblings().removeClass("cur");
		//决定那个albumul中的li带cur
 		// console.warn(nextProp);
 		//拼接字符串写法
 		// $(this.refs.albumul).find("li[data-album=" + this.props.picshow.nowalbum + "]").addClass("cur").siblings().removeClass("cur");
 		//es6模版字符串写法 
 		$(this.refs.albumul).find(`li[data-album=${this.props.picshow.nowalbum}]`).addClass("cur").siblings().removeClass("cur");
 	}
 	//显示图集方块（外观 中控 细节）
 	showAlbumList(){
 		let arr = [];
 		//会渲染两次
		// console.warn(111,this.props.picshow.data);
		if(!this.props.picshow.data[this.props.picshow.nowcolor]) return;

		if(this.props.picshow.data[this.props.picshow.nowcolor].hasOwnProperty("view")){
			arr.push(<li data-album="view" key={1}>外观（{this.props.picshow.data[this.props.picshow.nowcolor].view.length}）</li>)
		}
		if(this.props.picshow.data[this.props.picshow.nowcolor].hasOwnProperty("center")){
			arr.push(<li data-album="center" key={2}>中控 （{this.props.picshow.data[this.props.picshow.nowcolor].center.length}）</li>)
		}
		if(this.props.picshow.data[this.props.picshow.nowcolor].hasOwnProperty("detail")){
			arr.push(<li data-album="detail"  key={3}>细节 （{this.props.picshow.data[this.props.picshow.nowcolor].detail.length}）</li>)
		}
		return arr
 	}

	//显示颜色小方块
	showColorLis(){
		var arr = [];
		if(!this.props.picshow.data) return;
		var count = 0;
		for(var k in this.props.picshow.data){
			arr.push(<li key={count++} data-color={k}></li>)
		}
		return arr;
	}

	render(){
		return (
			<div>
				<h3>选择图集</h3>
				<ul ref="albumul">
					{this.showAlbumList()}
					{/*<li className="cur">外观（30张）</li>
					<li>中控（30张）</li>
					<li>细节（30张）</li>*/}
				</ul>
				<div className="cl"></div>
				<br/>
				<h3>选择颜色</h3>
				<ul className="colorul" ref="colorul">
					{this.showColorLis()}
				</ul>
			</div>
		);
	}
}

export default connect(({picshow})=>{
	return {
		picshow
	} 

})(Filterbox);
