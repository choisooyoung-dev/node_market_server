const express = require("express");
const router = express.Router();

const products = [];

// 상품 목록 조회
router.get("/products", (req, res) => {
  res.json({ products });
});

// 상품 상세 조회
router.get("/products/:productId", (req, res) => {
  const { productsId } = req.params;

  const [detail] = products.filter(
    (product) =>
      Number(productsId) === product.productsId
  );

  res.status(200).json({ detail });
});

module.exports = router;
