const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const multer = require('multer');
const pathLib = require('path');
const app = express();

// body-parser 用于解析post数据  application/x-www.form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// multer 用于解析post文件  multipart/form-data
// var objMulter = multer({dest: './dist'}).array('file');
// 或者 var objMulter = multer({dest: './dist'}).any();
var ccc = multer({ dest: './dist' }).array('file')  //此处的array('file')对应html部分的name
// app.use(objMulter );

app.post('/file_upload', ccc, function (req, res) {

  console.log(req);
  fs.readFile(req.files[0].path, function (err, data) {
    if (err) {
      console.log('Error');
    } else {
      var dir_file = 'a' + '/' + req.files[0].originalname
      // console.log(dir_file);
      fs.writeFile(dir_file, data, function (err) {
        var obj = {
          msg: 'upload success',
          filename: req.files[0].originalname
        }
        console.log(obj);
        res.send(JSON.stringify(obj));
      })
    }
  })
})
app.listen(8081, function () {
  console.log('Server is running at http://localhost:8081');
})