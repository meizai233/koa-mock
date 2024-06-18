// app.js
const Koa = require("koa");
const registerRouter = require("./routers");
const app = new Koa();
app.use(registerRouter());
app.listen(4000, () => {
  console.log("server is running, port is 4000");
});

// 路由技巧主要思路
// routers存放不同业务的路由，index文件打包路由和头
// app可以选择性使用路由
