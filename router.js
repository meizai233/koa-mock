// 存放router和controller的映射
const Router = require("koa-router");
const router = new Router();
const scenes = require("./controller/scenes");

// 待办 建议加一个前缀
// 可以在new Router那里 加一个prefix
const routerMap = [["get", "/scenes", scenes, "getScenesList"]];

routerMap.forEach((route) => {
  const [method, path, controller, action] = route;
  // 这样写其实也没错 1没有兼容async 2不知道作用域是否绑定到
  // router[method](path, async (ctx, next) => {
  //   controller[action](ctx, next);
  // });

  // 绑定this，这样class App可以少传一个ctx参数
  router[method](path, async (ctx, next) => {
    controller[action].bind(Object.assign(controller, { ctx }), ctx, next);
    // 本身controller的this是自己，现在将ctx加入作用域中
    controller[action](ctx, next);
  });
});

module.exports = router;
