// 子进程
process.on("message", function (m) {
  console.log("message from parent: " + JSON.stringify(m));
});

process.send({ from: "child" });

console.log("process: ", process);
