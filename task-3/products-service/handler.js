const data = require("./data/products.json");
exports.getProductList = async (event) => {
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
};

module.exports.getProductsById = async (event) => {
  const { productId } = event.pathParameters;

  const product = data.find((p) => p.id === productId);

  if (!product) {
    return {
      statusCode: 404,
      body: JSON.stringify({ message: "Product not found" }),
    };
  }

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  };
};
