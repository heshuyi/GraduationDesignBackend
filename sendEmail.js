let nodemailer= require('nodemailer')
let transporter = nodemailer.createTransport({
    service:"163",  //  邮箱
    secure:true,    //  安全的发送模式
    auth:{
        user:"15302006236@163.com", //  全局变量
        pass:"ZKRCOXQMZSNCSCBV"//  授权码
    }
})
// 第二步
let mailOptions = {
    from:"15302006236@163.com",
    to:"2580566683@qq.com",
    subject:"hsy",
    text:"wugeng"
}
// 第三步
transporter.sendMail(mailOptions,(err,data) => {
    if(err){
        console.log(err);

    }else{
        console.log(data);

    }
})
