const express = require("express");
const request = require("request");

const app = express();

const appid = "xxx"; //开发者的appid
const appsecret = "xxx"; //开发者的appsecret 登入小程序公共平台内查看

app.use("/login", (req, res) => {
  const code = req.query.code; //拿到传过来的code
  console.log("request code", code);
  //调用 auth.code2Session接口，换取用户唯一标识 OpenID 和 会话密钥 session_key
  const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${appsecret}&js_code=${code}&grant_type=authorization_code`;

  request(url, (err, response, body) => {
    console.log("body", body);
    res.send(body); //将请求到的 OpenID与 session_key 返回给小程序页面js文件
  });
});

app.listen(8000, () => {
  console.log("服务启动");
});
