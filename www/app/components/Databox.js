import React from "react";
import { connect } from "dva";
import brands from "../api/brands.js";
import { Table, Button , Pagination } from "antd";
import { Link } from 'dva/router';
 
class Databox extends React.Component {
    constructor(props){
        super(props);
		
		this.props.dispatch({"type" : "carsearch/fetchdata"});

		//备份全部的列名，方便一会儿删掉之后还能回来：
		this.state = {
			"col" : [
				{
				  title: 'id',
				  dataIndex: 'id',
				  key: 'id',
				},
				{
					title : "图片",
					dataIndex : "pic",
					key : "pic",
					render : function(text, record){
						return <Link to={`picshow/${record.picdir}`}><img width="100" src={`car_images/${record.pic}`} alt=""/></Link>
					}
				}, 
				{
				  title: '品牌',
				  dataIndex: 'brand',
				  key: 'brand',
				  sorter : function(a,b){

				  }
				}, 
					{
					  title: '国家',
					  dataIndex: 'country',
					  key: 'country',
					  sorter : function(a,b){
					
					}

				},
					{
					  title: '价格',
					  dataIndex: 'price',
					  key: 'price',
					  sorter : function(a,b){
					}

				},
					{
					  title: '座位',
					  dataIndex: 'seat',
					  key: 'seat',
					  sorter : function(a,b){
					}
				},
					{
					  title: '上市日期',
					  dataIndex: 'date',
					  key: 'date',
					  sorter : function(a,b){

					}
				}
			]
		}
    }
	//当发生排序时候做的事情
    handleChange(pagination, filters, sorter){
		// console.log(sorter);
		this.props.dispatch({"type" : "carsearch/setsorter" , payload : {sorter}})
    }
    //当发生换页时候做的事情
    changepaginationhandle(page, pagesize){
		this.props.dispatch({"type" : "carsearch/setpage", payload : {page, pagesize}})
    }
    //更改条目的时候
    sizechangehandler(page, pagesize){
    	this.props.dispatch({"type" : "carsearch/setpagesize" ,payload : {pagesize}})
    }
    render(){

    		
        return (
        	<div>
        		<Table pagination={false} columns={this.state.col} rowKey="id" dataSource={this.props.carsearch.carlist} onChange={this.handleChange.bind(this)}/>
        		<br/>
        		<Pagination showSizeChanger onChange={(page,pagesize)=>{this.changepaginationhandle(page,pagesize)}} defaultCurrent={10} 
        		pageSize={this.props.carsearch.pagination.pagesize} 
        		total={this.props.carsearch.totalamount}
        		current={this.props.carsearch.pagination.page}
				onShowSizeChange={(current, size)=>{this.sizechangehandler(current , size)}}
				pageSizeOptions={['10','20','50','100']}
        		/>
        	
        	</div>
        )
    }
}

export default connect(({carsearch})=>{
    return {
        carsearch
    }
})(Databox);