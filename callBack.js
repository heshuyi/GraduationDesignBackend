var dbConfig = require('./dbConfig');
var multer = require('multer')
var moment = require('moment')
const fs = require('fs');
const { connect } = require('http2');
const { config } = require('./dbConfig');
// 获取账号密码
var getTelPassword = (req, res) => {
  var tel = req.body.tel//账号
  var password = req.body.password
  var sqlArr = [tel]
  var sql = `select password from theuserinformation where tel=?`
  var getTel = function (err, data) {
    if (err) {
      console.log(err);
    } else {
      if (data.affectedRows == 1) {
        console.log(1111111111);
      }
      if (data.length > 0) {
        if (data[0].password == password) {
          res.send({
            status: 1,
            msg: '成功'
          })
        } else {
          res.send({
            status: 2,
            msg: '密码错误'
          })
        }
      } else {
        res.send({
          status: 3,
          msg: '账号不存在'
        })
      }
    }
  }
  dbConfig.sqlConnect(sql, sqlArr, getTel)
}
//  注册账号添加个人信息
var makeNewUser = function (req, res) {
  var flag = false;//标记没注册
  var userInformation = req.body;
  var sql1 = `select tel from theuserinformation where tel=?`
  var sqlArr1 = [userInformation.tel]
  //查找电话号是否存在
  var sqlTelExist = function (err, data) {
    if (err) {
      console.log(err);
    } else {
      if (data.length > 0) {
        flag = true
      }
    }
  }
  dbConfig.sqlConnect(sql1, sqlArr1, sqlTelExist)
  var sqladd = `insert into theuserinformation values(
    ${userInformation.tel},
    '${userInformation.password}',
    '${userInformation.name}',
    '${userInformation.province}',
    '${userInformation.city}',
    '${userInformation.county}',
    '${userInformation.postalCode}',
    '${userInformation.addressDetail}')`

  var sqladdArr = []
  var callback2 = function (err, data) {
    if (err) {
      res.send({
        status: 3,
        msg: '创建失败请重试' + err
      })
    } else {
      res.send({
        status: 1,
        msg: '成功'
      })
    }
  }
  if (flag == false) {
    dbConfig.sqlConnect(sqladd, sqladdArr, callback2)
  } else {
    res.send({
      status: 2,
      msg: '已拥有'
    })
  }

}
// 查看个人信息
var getMineInformation = function (req, res) {
  var account = req.body
  var sql = `select * from theuserinformation where tel=?`
  console.log(account);
  // var sqlArr = [account]
  // var callback = function (err, data) {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     res.send({
  //       datas: data,
  //       msg: '基本信息'
  //     })
  //   }
  // }
  // dbConfig.sqlConnect(sql, sqlArr, callback)
}
var addGoods = function (req, res) {
  var tel = req.body.tel
  var goodsName = req.body.goodsname
  var goodsText = req.body.goodstext
  var goodsMoney = req.body.goodsmoney
  var goodsid = moment().format('X')
  var data = moment().format()
  console.log(data);
  // var dir_file = 'img/goods/' + tel + '-' + goodsid + '.' + req.file.mimetype.split('/')[1]
  var dir_file = 'img/' + tel + '-' + goodsid + '.' + req.file.mimetype.split('/')[1]
  // var filewhere1 = 'E:\\毕业设计/GraduationDesignFrontEnd/src/' + dir_file
  var filewhere = 'http://localhost:3001/' + dir_file
  var sql = `insert into sellgoodstable values(
  '${goodsid}',
  '${tel}',
  '${goodsName}',
  '${goodsText}',
  '${goodsMoney}',
  '${data}',
  '${filewhere}'
  )`
  fs.readFile(req.file.path, function (err, data) {
    if (err) {
      console.log('Error');
    } else {
      console.log('dir_file', dir_file);
      fs.writeFile('public/' + dir_file, data, function (err) {
        console.log('写入时', err);
        if (err) {
          res.send({
            code: 0,
            msg: '上传错误重试1'
          });
          return
        } else {
          console.log('数据库');
          dbConfig.sqlConnect(sql, [], function (err, data) {
            if (err) {
              console.log(err);
              res.send({
                code: 0,
                msg: '上传错误重试2'
              });
            } else {
              console.log(22222);
              res.send({
                code: 1,
                msg: '上传成功',
                img: filewhere
              });
            }
          })
        }
      })
    }
  })

}
var getgoods = function (req, res) {
  var tel = req.body.tel
  sql = `select * from sellgoodstable where tel=?`
  dbConfig.sqlConnect(sql, [tel], (err, data) => {
    if (err) {
      console.log(err);
      res.send({
        code: 0,
        msg: '错误重试刷新'
      })
    } else {
      res.send({
        code: 1,
        data: data,
        msg: '成功'
      })
    }
  })
}
module.exports = {
  getTelPassword,
  makeNewUser,
  getMineInformation,
  addGoods,
  getgoods
}