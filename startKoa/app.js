// app.js
const Koa = require("koa");
const path = require("path");
const fs = require("fs");
const static = require("koa-static");
const Router = require("koa-router");
const { koaBody } = require("koa-body");
const app = new Koa();
const router = new Router();

const staticPath = "./static";

// 添加 CORS 中间件
app.use(async (ctx, next) => {
  // 允许所有来源访问，也可以根据需要设置特定的来源
  ctx.set("Access-Control-Allow-Origin", "*");
  // 允许请求携带的请求头
  ctx.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  // 允许请求的方法
  ctx.set("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
  // 如果请求方法是 OPTIONS，则直接返回 200，表示接受预检请求
  if (ctx.method === "OPTIONS") {
    ctx.status = 200;
  } else {
    // 继续处理其他请求
    await next();
  }
});
// post请求 解析body
app.use(
  koaBody({
    multipart: true,
    formidable: {
      maxFileSize: 200 * 1024 * 1024, // 设置上传文件的限制, 默认2MB
    },
  })
);

app.use(static(path.join(__dirname, staticPath)));

app.use(router.routes());

router.post("/upload", async (ctx) => {
  // 获取文件对象

  // 为什么在这里获取？
  // 疑问 ctx.request是什么类型对象
  const file = ctx.request.files.file;

  // 读取文件内容
  const data = fs.readFileSync(file.filepath);
  // 保存到服务端
  fs.writeFileSync(path.join(__dirname, file.originalFilename), data);
  ctx.body = { message: "上传成功！" };
});

app.listen(4000, () => {
  console.log("server is running, http://localhost:4000");
});
