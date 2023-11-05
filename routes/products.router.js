const express = require("express");
const router = express.Router();

const products = require("../schemas/products.schema");
const { stringify } = require("nodemon/lib/utils");

// 상품 전체 조회
router.get("/products", async (req, res) => {
  try {
    const allProducts = await products.find({});
    // 내림차순 정렬
    return res.send(allProducts.reverse());
  } catch (error) {
    return res.json({ fail: "fail" });
  }
});

// 상품 상세 조회
router.get("/products/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    console.log(productId);
    const allProducts = await products.find({});
    // const detail = await products.findOne({ productId });
    const detail = allProducts.filter(
      (product) => String(product._id) === productId
    );
    console.log(detail);
    return res.status(200).send(detail);
  } catch (error) {
    return res.json({ fail: "fail" });
  }
});

// 상품 등록
router.post("/products", (req, res) => {
  try {
    products.create({
      title: req.body.title,
      content: req.body.content,
      author: req.body.author,
      pwd: req.body.pwd,
      status: req.body.status,
    });
    return res.status(200).json({ message: "판매 상품을 등록하였습니다." });
  } catch (error) {
    return res.json({ errorMessage: "데이터 형식이 올바르지 않습니다." });
  }
});

// 상품 수정
router.put("/products/:productId", async (req, res) => {
  try {
    const { title, content, author, pwd, status } = req.body;
    const { productId } = req.params;
    const allProducts = await products.find({});
    // const detail = await products.findOne({ productId });
    const detail = allProducts.filter(
      (product) => String(product._id) === productId
    );
    console.log(detail[0]);

    const modifiedProduct = {
      title,
      content,
      author,
      pwd,
      status,
    };

    await detail[0].updateOne(modifiedProduct);

    return res.json({ message: "modify!" });
  } catch (error) {
    console.log(req.params);
    return res.json({ fail: "fail" });
  }
});

module.exports = router;
