const cp = require("child_process");

// spawn cmd, args, options
cp.spawn("node", ["./dir/test1.js"], { stdio: "inherit" });

// exec
cp.exec("node ./dir/test1.js", (err, stdout, stderr) => {
  console.log(stdout);
});
// execFile
cp.execFile("node", ["./dir/test1.js"], (err, stdout, stderr) => {
  console.log(stdout);
});
// fork
cp.fork("./dir/test1.js", { silent: false });
