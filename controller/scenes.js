const App = require("./app");
const Mock = require("mockjs");

class Scenes extends App {
  getScenesList(ctx, next) {
    // 定义数据模板
    const dataTemplate = {
      "deviceSerialNum|1000-9999": 10000, // 生成一个1000到9999之间的随机数字
      deviceRoleType: "@ctitle(5)", // 生成一个5个字母的随机中文标题
      deviceRegister: "@cparagraph", // 生成一个随机段落
      operation: '@pick(["启动", "关闭", "重启"])', // 从给定数组中随机选择一项
    };

    // 待办 数据格式要再确认一下
    const mockData = Mock.mock({
      [`list|${this.ctx.request.query.pageSize}`]: [dataTemplate], // 生成包含10个数据项的数组
    });

    super.success(mockData);

    // 错误处理机制 待办
  }
}

module.exports = new Scenes();
