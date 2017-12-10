import React from "react";
import R from "ramda";
// const R = require("ramda");

export default {
	namespace : "carsearch",
	state : {
		"filter" : {},
		"carlist" : [],
		"pagination" : {
			"page" : 1,
			"pagesize" : 10,
			"sortby" : "id",
			"sortdirection" : "scend"
		},
		//条目总数
		"totalamount" : 1
	},
	//同步
	reducers : {
		settag_async(state, {payload}){
			return {
				...state ,
				"filter" : {
					...state.filter,
					[payload.tagkey] : payload.tagvalue
				}
			}
		},
		deltag_async(state, {payload}){
			//用ramda深克隆一个原来的对象 实现country过滤
			var filter = R.clone(state.filter);
			delete filter[payload.keyname];

			return {
				...state , 
				"filter" : filter
			}
		},
		setlist(state,{payload}){
			return {
				...state, 
				"carlist" : payload.results,
				"totalamount" : payload.totalamount
			}
		},
		setsorter_async(state,{payload}){
			return {
				...state,
				"pagination" : {
					...state.pagination,
					"sortby" : payload.sorter.field,
					"sortdirection" : payload.sorter.order

				}
			}
		},
		setpage_async(state,{payload}){
			return {
				...state,
				"pagination" : {
					...state.pagination,
					"page" : payload.page,
					"pagesize" : payload.pagesize

				}
			}
		},
		setpagesize_async(state,{payload}){
			return {
				...state,
				"pagination" : {
					...state.pagination,
					"pagesize" : payload.pagesize
				}
			}
		}
	},
	//异步
	effects : {
		settag : function* ({payload}, {put, select}){
			yield put({"type" : "settag_async", payload : payload});

			yield put({"type" : "fetchdata"})
		},
		deltag : function*({payload}, {put,select}){
			//同步读取
			yield put({"type" : "deltag_async", payload : payload});
			yield put({"type" : "fetchdata"})
		},
		setsorter : function*({payload}, {put,select}){
			//先同步
			yield put({"type" : "setsorter_async" , payload : payload});
			//异步
			yield put({"type" : "fetchdata"});
		},
		setpage : function*({payload},{put,select}){
			//先同步
			yield put({"type" : "setpage_async" , payload : payload});
			//异步
			yield put({"type" : "fetchdata"});
		},	
		setpagesize : function*({payload},{put,select}){
			//先同步
			yield put({"type" : "setpagesize_async" , payload : payload});
			//异步
			yield put({"type" : "fetchdata"});
		},
		fetchdata : function*({payload}, {put,select}){
			//找服务器拉去最新的数据
			const filter = yield select(state=>state.carsearch.filter);
			const pagination = yield select(state=>state.carsearch.pagination);

			const {results, totalamount} = yield fetch("/cardata",{
				"method" : "post",
				"headers" : {
					"Content-Type": "application/x-www-form-urlencoded"
				},
				"body" : "filter=" + encodeURI(JSON.stringify(filter)) + "&pagination=" + JSON.stringify(pagination)
			}).then((res)=>res.json())
			yield put({"type" : "setlist", payload : {results, totalamount}});
		}
	}
}