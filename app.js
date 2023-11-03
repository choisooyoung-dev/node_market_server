const express = require("express");
const app = express();
const port = 3000;

// 스키마 연결
const connect = require("./schemas/index");
connect();

const productsRouter = require("./routes/products/router");

app.use(express.json());

app.use("/api", [productsRouter]);

app.get("/", (req, res) => {
  res.send("Hello / ");
});

app.listen(port, () => {
  console.log(port, "포트로 서버가 열렸습니다.");
});
