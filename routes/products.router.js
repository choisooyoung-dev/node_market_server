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
    return res
      .status(400)
      .json({ message: "데이터 형식이 올바르지 않습니다." });
  }
});

// 입력 값 없는 경우
router.get("/product/", async (req, res) => {
  return res
    .status(400)
    .json({ errorMessage: "데이터 형식이 올바르지 않습니다." });
});

// 상품 상세 조회
router.get("/product/:productId", async (req, res) => {
  const { productId } = req.params;
  // console.log(productId);

  try {
    const allProducts = await products.find({});

    // console.log(allProducts);

    // 파라미터로 받은 productid 값과 데이터 고유의 아이디(_id) 값이 일치하는 상품만 걸러내기
    // 파라미터로 받은 product._id 타입 -> Object => String으로 형변환 시켜서 일치하는지 확인하기
    // 데이터 안에 존재하는 productId 타입 -> String
    const detail = allProducts.filter(
      (product) => String(product._id) === productId
    );

    // 파라미터로 받은 productId 값과 일치하는 데이터의 아이디 값이 없으면
    // if (detail.length < 1) {
    //   return res.json({ message: "해당 상품은 존재하지 않습니다." });
    // }

    // console.log(detail);
    // 존재하면 해당 상품 보여주기
    return res.status(200).send(detail);
  } catch (error) {
    return res.json({ message: "데이터 형식이 올바르지 않습니다." });
  }
});

// 상품 등록
router.post("/product", (req, res) => {
  const { title, content, author, pwd, status } = req.body;
  try {
    products.create({
      title,
      content,
      author,
      pwd,
      status,
    });
    return res.status(200).json({ message: "판매 상품을 등록하였습니다." });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "데이터 형식이 올바르지 않습니다." });
  }
});

// 상품 수정
router.put("/product/:productId", async (req, res) => {
  const { title, content, author, pwd, status } = req.body;
  const { productId } = req.params;
  const modifiedProduct = {
    title,
    content,
    author,
    pwd,
    status,
  };

  try {
    const allProducts = await products.find({});
    // const detail = await products.findOne({ productId });
    const detail = allProducts.filter(
      (product) => String(product._id) === productId
    );
    // console.log(detail[0]);

    if (pwd !== detail[0].pwd) {
      return res
        .status(401)
        .send({ message: "상품을 수정할 권한이 존재하지 않습니다." });
    }

    await detail[0].updateOne(modifiedProduct);

    return res.json({ message: "상품이 수정되었습니다." });
  } catch (error) {
    console.log(req.params);
    return res.json({ message: "해당 상품이 존재하지 않습니다." });
  }
});

// 상품 삭제
router.delete("/products/:productId", async (req, res) => {
  const { productId } = req.params;
  const { pwd } = req.body;

  try {
    const allProducts = await products.find({});
    // console.log(allProducts);
    const detail = allProducts.filter(
      (product) => String(product._id) === productId
    );
    // console.log(detail[0]);

    if (pwd !== detail[0].pwd) {
      return res
        .status(401)
        .send({ message: "상품을 삭제할 권한이 존재하지 않습니다." });
    }

    await detail[0].deleteOne({ productId });
    return res.json({ message: "상품이 삭제되었습니다." });
  } catch (error) {
    return res.status(404).send({ message: "상품 삭제에 실패하였습니다." });
  }
});

module.exports = router;
