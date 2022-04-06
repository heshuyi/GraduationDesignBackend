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
          callback(err,data)
          conn.release()

      })
    }
  })
}


