var express = require("express");
var app = express();
var fs = require("fs");
var url = require("url");
var formidable = require("formidable");
var cardata = require("./database/cardata.json");



app.use(express.static("www"));

app.post("/cardata",function(req, res){
	fs.readFile("./database/cardata.json",function(err, data){
		var list = JSON.parse(data.toString()).list;

		var form = new formidable.IncomingForm();
		form.parse(req, function(err, fields, files){
			//拿到过滤器转换为对象
			var filter = JSON.parse(fields.filter);
			
			//拿到分页属性，转为对象
			var pagination = JSON.parse(fields.pagination);

			// console.log(pagination);

			//----------------------------过滤----------------------------
			if(filter.hasOwnProperty("country")){
				var country = filter["country"];
				list = list.filter((item)=>{
					return item.country == country;
				});
				
			}

			if(filter.hasOwnProperty("brand")){
				var brand = filter["brand"];
				list = list.filter((item)=>{
					return item.brand == brand;
				});
				
			}

			if(filter.hasOwnProperty("type")){
				var type = filter["type"];
				list = list.filter((item)=>{
					return item.type == type;
				});
				
			}

			if(filter.hasOwnProperty("seat")){
				var seat = filter["seat"];
				list = list.filter((item)=>{
					return seat.indexOf(item.seat) != -1;
				});
				
			}
			
			if(filter.hasOwnProperty("price")){
				var max = filter["price"][1];
				var min = filter["price"][0];

				list = list.filter((item)=>{
					return item.price <= max && item.price >= min;
				});
				
			}
			
			if(filter.hasOwnProperty("date")){
				var max = filter["date"][1];
				var min = filter["date"][0];

				list = list.filter((item)=>{
					const time = Date.parse(new Date(item.date))
					return time <= max && time >= min;
				});
				

			}

			//----------------------------排序----------------------------

			//用户传入
			var {page,pageamount,pagesize,sortby,sortdirection} = pagination;
			if(sortby == "id" || sortby == "price" || sortby == "seat" || sortby == "type" || sortby == "country"|| sortby == "brand"){
				//正序
				var n = sortdirection == "ascend" ? 1 : 1;
				//排序
				list.sort(function(a, b){
					return a[sortby] > b[[sortby]] ? n : -n;
				})
			}else if(sortby == "date"){
				var n = sortdirection == "ascend" ? 1 : 1;
				//排序
				list.sort(function(a, b){
					return Date.parse(new Date(a["date"])) > Date.parse(new Date(b["date"])) ? n : -n;
				})
			}

			//----------------------------分页----------------------------
			//记录总数
			var pageamount = list.length;

			var totalamount = list.length;
			//用户传入
			var {page , pagesize } = pagination;
			
			list = list.slice((page - 1) * pagesize , page * pagesize);
			// console.log(page,pageamount,pagesize,sortby,sortdirection);
			console.log(list)
			// console.log(filter)
			res.json({"results" : list, totalamount})
		})
	})
	
})

//中间件
app.get("/car/:carname" , (req,res) => {
	var carname = req.params.carname;
	//最终返回结果
	var result = {};
	//读取颜色文件夹
	var colordirs = fs.readdirSync(`./www/car_images/${carname}`);
	//循环
	for(let i = 0 ; i < colordirs.length ; i++){
		result[colordirs[i]] = {};
		//读取相册（中控、外观、细节）文件夹
		var albumdirs = fs.readdirSync(`./www/car_images/${carname}/${colordirs[i]}`);
		//遍历
		for(let j = 0 ; j < albumdirs.length ; j++){
			var pics = fs.readdirSync(`./www/car_images/${carname}/${colordirs[i]}/${albumdirs[j]}`);
			//加对象
			result[colordirs[i]][albumdirs[j]] = pics;
		}
	}
	res.json({"result" : result});
});

app.listen(3000);