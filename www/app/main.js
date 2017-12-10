import React from "react";
import dva, { connect } from 'dva';
import carsearch from "./models/carsearch.js";
import picshow from "./models/picshow.js";
import router from "./router.js";
import createLogger from 'dva-logger';
//创建app
const app = dva();

//使用插件
app.use(createLogger());

//使用model
app.model(carsearch);
app.model(picshow)

//路由
app.router(router);

//启动
app.start("#root");