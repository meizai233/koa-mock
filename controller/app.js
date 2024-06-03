// 对返回的数据统一封装
const Mock = require("mockjs");

class App {
  success(data) {
    this.ctx.body = {
      code: 0,
      data,
    };
  }
  handleList(dataTemplate) {
    // 根据req.page决定数组长度，并用list封装一下，返回一个数组
    const list = Mock.mock();
  }
}

module.exports = App;
