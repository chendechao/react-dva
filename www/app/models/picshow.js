import React from "react";
import R from "ramda";
// const R = require("ramda");

export default {
	namespace : "picshow",
	state : {
		car : "bmw_330i",
		data : {},
		nowalbum : "view",
		nowcolor : "blue",
		nowpicidx : 0
	},
	//同步
	reducers : {
		init(state, {payload}){
			// console.log(payload.result);
			return {
				...state , 
				car : payload.car,
				data : payload.result,
				nowcolor : Object.keys(payload.result)[0]
			}
		},
		changealbum(state, {payload}){
			// return R.set(R.lensProp("nowalbum") , payload.album, state);
			return {
				...state , 
				nowalbum : payload.album,
				nowpicidx : 0
			}
		},
		changecolor(state, {payload}){
			return{
				...state,
				nowalbum : "view",
				nowcolor : payload.color,
				nowpicidx : 0
			}
		},
		changepicidx(state , {payload}){
			return {
				...state ,
				nowpicidx : payload.idx
			}
		},
		gonext(state , {payload}){
			const albumarr = [];
			state.data[state.nowcolor].hasOwnProperty("view") && albumarr.push("view");
			state.data[state.nowcolor].hasOwnProperty("center") && albumarr.push("center");
			state.data[state.nowcolor].hasOwnProperty("detail") && albumarr.push("detail");

			const coloramount = Object.keys(state.data).length; //颜色总数
			const nowcoloridx = Object.keys(state.data).indexOf(state.nowcolor); //当前颜色编号
			
			const albumamount = Object.keys(state.data[state.nowcolor]).length; //图集的总数
			const nowalbumidx = albumarr.indexOf(state.nowalbum); //当前图集的编号

			const picamount = state.data[state.nowcolor][state.nowalbum].length; //当前图集 图片的总数
			const picidx = state.nowpicidx; //当前图片的编号

			if(picidx + 1 == picamount){

					if(nowalbumidx + 1 == albumamount){

						if(nowcoloridx + 1 == coloramount){
							alert("已经到末尾了，是否开始从头看？")
							return {
								...state ,
								nowpicidx : 0,
								nowalbum : "view",
								nowcolor : Object.keys(state.data)[0]
							}
						}
						return {
							...state , 
							nowpicidx : 0,
							nowalbum : "view",
							nowcolor : Object.keys(state.data)[nowcoloridx + 1]
						}
					}
					return {
						...state , 
						nowpicidx : 0,
						nowalbum : albumarr[nowalbumidx + 1]
					}
			}
			// alert(coloramount);
			// alert(picidx);
			return {
				...state , 
				nowpicidx : state.nowpicidx + 1
			}
		},
		goprev(state , {payload}){
			return {
				...state , 
				nowpicidx : state.nowpicidx - 1
			}
		}	
	},
	//异步
	effects : {
		//拉去默认数据
		fetchinit : function* (action, {put}){
			// console.log(action.car);
			const {result} = yield fetch(`/car/${action.car}`).then(res => res.json());
			yield put({"type" : "init" ,  "payload" : {result , car : action.car}})
		}
	}
}