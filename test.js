const Koa = require("koa");
const Router = require("koa-router");

const app = new Koa();
const router = new Router();

// 定义路由
router.get("/", async (ctx) => {
  ctx.body = "Hello, world!";
});

router.get("/about", async (ctx) => {
  ctx.body = "About us page";
});

router.get("/users/:id", async (ctx) => {
  const userId = ctx.params.id;
  ctx.body = `User ID: ${userId}`;
});

// 注册路由中间件
app.use(router.routes());
app.use(router.allowedMethods());

// 启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
