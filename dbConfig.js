const mysql = require('mysql')

const config={
    host: 'localhost',
    post: '3306',
    user: 'root',
    password: 'root',
    database: 'shopping',
}
const pool = mysql.createPool(config)
module.exports.sqlConnect = (sql ,sqlArr,callback)=>{
  pool.getConnection((err,conn)=>{
    if (err){
      console.log('连接mysql失败')
      pool.releaseConnection()
      return
    }else {
      conn.query(sql,sqlArr,(err,data,fieled)=>{
        if (err){
          conn.release()
        }else {
          callback(err,data)
          conn.release()
        }
      })
    }
  })
}

  // 链接数据库连接池方式
  // sqlConnect: function (sql, sqlArr, callback) {
  //   var pool = mysql.createPool(this.config)
  //   pool.getConnection((err, conn) => {
  //     // console.log('123456');
  //     if (err) {
  //       console.log(err)
  //       console.log('数据库连接失败');
  //       return
  //     }
  //     // 事件驱动回调
  //     conn.query(sql, sqlArr, (err,result,fields)=>{
  //       callback(err,result)
  //       conn.release();
  //     });
  //   })
  // }

