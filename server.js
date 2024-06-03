const Koa = require("koa");
const router = require("./router");
// const Router = require("koa-router");
// const router = new Router();

const app = new Koa();

app.use(async (ctx, next) => {
  console.log("ctx", ctx);
  next();
});

// 注册路由中间件
// 暂存 为什么路由有什么问题 请求不到
// router.get("/scenes", (ctx, next) => {
//   ctx.body = "Hello, world!";
//   console.log("ctx111", ctx);
// });
app.use(router.routes());
// app.use(router.allowedMethods());

app.listen(3000);
console.log("app started at port 3000...");
