const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const connect = () => {
  // mongoose.connect는 MongoDB 서버에 연결하는 메서드입니다.
  mongoose
    .connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PW}@marketcluster.evtlomv.mongodb.net/?retryWrites=true&w=majority`,
      {
        dbName: `${process.env.DB_NAME}`, // spa_market 데이터베이스명을 사용합니다.
      }
    )
    .then(() => console.log("MongoDB 연결에 성공하였습니다."))
    .catch((err) => console.log(`MongoDB 연결에 실패하였습니다. ${err}`));
};

mongoose.connection.on("error", (err) => {
  console.error("MongoDB 연결 에러", err);
});

module.exports = connect;
