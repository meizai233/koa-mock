// 父进程
const cp = require("child_process");

// 创建子进程
const child3 = cp.fork("./child.js");

// 监听消息
child3.on("message", (m) => {
  console.log("message from child: " + JSON.stringify(m));
});

child3.send({ from: "parent" });
