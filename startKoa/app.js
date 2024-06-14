// app.js
const Koa = require("koa");
const path = require("path");
const fs = require("fs");
const static = require("koa-static");
const Router = require("koa-router");
const { koaBody } = require("koa-body");
const app = new Koa();
const router = new Router();
const send = require("koa-send");

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
  // 以为 ctx是什么。。怎么进行封装的。。
  const file = ctx.request.files.file;

  // 读取文件内容
  const data = fs.readFileSync(file.filepath);
  // 保存到服务端
  fs.writeFileSync(path.join(__dirname, file.originalFilename), data);
  ctx.body = { message: "上传成功！" };
});

router.get("/download/:name", async (ctx) => {
  const name = ctx.params.name;
  const path = `${name}`;
  ctx.attachment(path);
  const options = {
    root: __dirname,
    maxage: 3600000, // 设置文件在浏览器缓存中的最大时间为一小时 1小时内发送相同的请求，浏览器缓存直接回复，节约服务器资源
    immutable: true, // 资源不可变，可以永久缓存（只要maxage不为0）
    hidden: false,
  };

  await send(ctx, path, options);
});

app.listen(4000, () => {
  console.log("server is running, http://localhost:4000");
});
