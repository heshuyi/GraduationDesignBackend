const dbConfig = require('./dbConfig');
let d = 0
setInterval(()=>{
    let sql = `SELECT * FROM sellgoodstable WHERE starttime < NOW()`
    let sqlMaxMoneyTel = `SELECT * FROM newestgoodsmoney WHERE newGoodid=? ORDER BY newGoodid,newMoney DESC`
    dbConfig.sqlConnect(sql,[],(err,data)=>{
        if (err){
            console.log(err)
        }else {
            if (data.length>0){
                dbConfig.sqlConnect()
            }
        }
    })
},1000)