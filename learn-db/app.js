const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("koadb", "root", "123456", { host: "localhost", dialect: "mysql" });

// testing the connection
// const testConnection = async () => {
//   try {
//     await sequelize.authenticate();
//     console.log("Connection has been established successfully.");
//   } catch (error) {
//     console.error("Unable to connect to the database:", error);
//   }
// };

// testConnection();

// 定义表格
// const User = sequelize.define(
//   "user_table",
//   {
//     id: {
//       type: Sequelize.STRING(50),
//       primaryKey: true,
//     },
//     username: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//     nikename: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//   },
//   {
//     timestamps: false,
//   }
// );

// // 创建数据
// User.create({
//   username: "liujianghong2",
//   nickname: "刘江红2",
// })
//   .then((res) => {
//     console.log("res_seq", res);
//   })
//   .catch((err) => {
//     console.log("err", err);
//   });
