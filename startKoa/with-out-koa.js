const http = require("http");
const url = require("url");
const querystring = require("querystring");

// 用户数据库
const users = {
  user1: "aaa",
  user2: "password2",
};

// 生成会话ID
function generateSessionId() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

// 用户登录处理
function login(request, response) {
  let body = "";
  request.on("data", (chunk) => {
    body += chunk.toString();
  });
  request.on("end", () => {
    const data = querystring.parse(body);
    const username = data.username;
    const password = data.password;

    // 在数据库中验证用户身份
    if (users[username] && users[username] === password) {
      // 生成一个唯一的会话标识符
      const sessionId = generateSessionId();

      // 将会话标识符返回给客户端，并设置在cookie中
      response.setHeader("Set-Cookie", `sessionId=${sessionId}; HttpOnly`);
      response.end("Login successful");
    } else {
      response.end("Invalid username or password");
    }
  });
}

// 创建服务器
const server = http.createServer((request, response) => {
  const reqUrl = url.parse(request.url, true);
  response.setHeader("Access-Control-Allow-Origin", "*");

  if (reqUrl.pathname === "/login" && request.method === "POST") {
    login(request, response);
  } else {
    response.statusCode = 404;
    response.end("Not Found");
  }
});

// 监听端口
server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
