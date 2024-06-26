// routers/index.js
const compose = require("koa-compose");
// 这是干嘛的
const glob = require("glob");
const { resolve } = require("path");

registerRouter = () => {
  let routers = [];
  // 递归式获取当前文件夹下所有的.js文件
  debugger;
  glob
    .sync(resolve(__dirname, "./", "**/*.js"))
    // 排除index.js文件, 因为这个文件不是具体的路由文件
    .filter((value) => value.indexOf("index.js") === -1)
    .forEach((router) => {
      // push一个中间件函数 添加到中间件堆栈中
      routers.push(require(router).routes());
      routers.push(require(router).allowedMethods());
    });
  return compose(routers);
};

// registerRouter();

module.exports = registerRouter;
