import React from "react";
import {connect} from "dva";
import { Button, Tag, Slider} from "antd";
import "./CarSearchBox.less";

import CountryFilter from "../components/CountryFilter.js";
import FilterList from "../components/FilterList.js";
import BrandFilter from "../components/BrandFilter.js";
import TypeFilter from "../components/TypeFilter.js";
import SeatFilter from "../components/SeatFilter.js";
import PriceFilter from "../components/PriceFilter.js";
import DateFilter from "../components/DateFilter.js";
import Databox from "../components/Databox.js";


class CarSearchBox extends React.Component{
	constructor({props}){
		super(props);

	}
 
	render(){
		return (
			<div className="carsearchbox">
				<div className="container">
					<table className="table">
						<tbody>
							<tr>
								<td>
									<FilterList></FilterList>
								</td>
							</tr>
							<tr>
								{!this.props.carsearch.filter.hasOwnProperty("country") && !this.props.carsearch.filter.hasOwnProperty("brand") && <td><CountryFilter></CountryFilter></td>}
								
							</tr>
							<tr>
								{!this.props.carsearch.filter.hasOwnProperty("brand") && <td><BrandFilter></BrandFilter></td> }
								
							</tr>
							<tr>
								{!this.props.carsearch.filter.hasOwnProperty("type") && <td><TypeFilter></TypeFilter></td> }
								
							</tr>
							<tr>
								{!this.props.carsearch.filter.hasOwnProperty("seat") && <td><SeatFilter></SeatFilter></td> }
								
							</tr>
							<tr>
								{!this.props.carsearch.filter.hasOwnProperty("price") && <td><PriceFilter></PriceFilter></td> }
								
							</tr>
							<tr>
								{!this.props.carsearch.filter.hasOwnProperty("date") && <td><DateFilter></DateFilter></td> }
								
							</tr>
							
						</tbody>
					</table>
					<div className="databox">
						<Databox></Databox>
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
})(CarSearchBox);