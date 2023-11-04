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

router.post("/product", (req, res) => {
  try {
    products.create({
      title: req.body.title,
      content: req.body.content,
      author: req.body.author,
      pwd: req.body.pwd,
      status: req.body.status,
    });
    return res.status(200).json({ success: "success" });
  } catch (error) {
    return res.json({ fail: "fail" });
  }
});
module.exports = router;
