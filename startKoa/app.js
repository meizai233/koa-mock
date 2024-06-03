const Koa = require("koa");
const fs = require("fs");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");
const session = require("koa-session");
const app = new Koa();
const router = new Router();
const Store = require("./store");
const shortid = require("shortid");

const redisConfig = {
  redis: {
    port: 6379,
    host: "127.0.0.1",
    password: "",
  },
};

const sessionConfig = {
  // Cookie 键名
  key: "koa:sess",
  // 过期时间为一天
  maxAge: 86400000,
  // 不做签名
  signed: false,
  // 外部存储
  // ???这个store需要什么类型
  store: new Store(redisConfig),
  prefix: "fwy",
};

app.use(session(sessionConfig, app));
app.use(bodyParser());
app.use(router.routes());
// 用来加载前端页面
router.get("/", async (ctx) => {
  ctx.set({ "Content-Type": "text/html" });
  ctx.body = fs.readFileSync("/Users/suda/Documents/work/project/koa-mock/startKoa/index.html");
});

// 当用户登录时
router.post("/login", async (ctx) => {
  console.log("ctxx", ctx);

  const postData = ctx.request.body; // 获取用户的提交数据
  if (ctx.session.usr) {
    ctx.body = `欢迎, ${ctx.session.usr}`;
  } else {
    // 他是怎么把sessionid存储到客户端的 应该是koa-session做了处理
    ctx.session = postData;
    ctx.body = "您第一次登录系统";
  }
});

app.listen(4000, () => {
  console.log("server is running, port is 4000");
});
