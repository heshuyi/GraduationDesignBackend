//引入express 创建服务器
const fs = require('fs')
var dbConfig = require('./dbConfig');
var express = require('express');
var app = express();
var multer = require('multer')
var moment = require('moment')
const upload = multer({ dest: './uploads/' }).single('file')
// 需要对表单数据进行解析的，安装bodyParser
var bodyParser = require('body-parser');    //解析函数
app.use(bodyParser.json());                 //json请求
app.use(bodyParser.urlencoded({ extended: true }));       //表单请求
app.use(express.static('public'));
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", req.headers.origin); //需要显示设置来源
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Credentials", true); //带cookies7     
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});
// 配置接口api
app.get('/api11', function (req, res) {
  res.status(200)
  res.send(req.query)
})
app.post('/api12', function (req, res) {
  // res.json(req.body)
})
//登录账号的
var callbacks = require('./callBack');
app.post('/tologin', callbacks.getTelPassword)
// 注册
app.post('/registered', callbacks.makeNewUser)
//我的主页 查看自己信息
app.get('/getmine', callbacks.getMineInformation)
app.post('/CreateSellOrder', upload, callbacks.addGoods)
app.post('/getgoods', callbacks.getgoods)
app.post('/getsellgoods', callbacks.getsellgoods)
app.post('/addtoshopcar', callbacks.addtoshopcar)
app.post('/getAuctionList', callbacks.getAuctionList)
app.post('/historySearch',callbacks.historySearch)
app.post('/addHistoryValue',callbacks.addHistoryValue)
app.post('/delHistoryValue',callbacks.delHistoryValue)
// 配置服务端口
app.listen(3001, function () {
  // var host = server.address().address;
  // var port = server.address().port;
  console.log('服务启动');
})