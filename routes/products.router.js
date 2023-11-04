const express = require("express");
const router = express.Router();

const products = require("../schemas/products.schema");

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
    const detail = await products.findOne({ productId });
    // const detail = allProducts.filter(
    //   (product) => String(product._id) === productId
    // );
    // console.log(detail);
    return res.send(detail);
  } catch (error) {
    return res.json({ fail: "fail" });
  }
});

// 상품 등록
router.post("/product", (req, res) => {
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
    const { productId } = req.params;
    const allProducts = await products.find({});
    const matchIdProduct = allProducts.filter(
      (product) => String(product._id) === productId
    );

    matchIdProduct.updateOne(
      { productId: products._id },
      {
        $set: {
          title: req.body.title,
          content: req.body.content,
          author: req.body.author,
          pwd: req.body.pwd,
          status: req.body.status,
        },
      }
    );
    return res.json({ success: "success" });
  } catch (error) {
    return res.json({ fail: "fail" });
  }
});

module.exports = router;
