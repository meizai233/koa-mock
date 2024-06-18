// app.js
const koa = require("koa");
const bodyParser = require("koa-bodyparser");
const app = new koa();
const Router = require("koa-router");
const router = new Router();
const static = require("koa-static");
const path = require("path");
const cors = require("@koa/cors");

const { sign } = require("jsonwebtoken");
const secret = "my_secret";
const jwt = require("koa-jwt")({ secret });
console.log("jwt", jwt);

app.use(
  cors({
    origin: "*",
  })
);

app.use(bodyParser());
app.use(static(path.join(__dirname, "/static")));

// 登录流程
// 解析用户名密码（可以不是明文 payload也行 去数据库中查询 或者直接sign生成jwt 存到body
router
  .post("/login", async (ctx, next) => {
    // 拿到username
    const { userName } = ctx.request.body;
    if (userName) {
      // 此处生成token
      const token = sign({ userName }, secret, { expiresIn: "1h" });
      ctx.body = {
        mssage: "get token success!",
        code: 1,
        token,
      };
    } else {
      ctx.body = {
        message: "param error",
        code: -1,
      };
    }
  })
  .get("/welcome", jwt, async (ctx, next) => {
    // 这里是经过一个jwt中间件
    ctx.body = { message: "welcome!!!" };
  });

app.use(router.routes()).use(router.allowedMethods());
app.listen(4000, () => {
  console.log("server is running, port is 4000");
});
