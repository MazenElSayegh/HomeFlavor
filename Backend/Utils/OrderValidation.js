const Ajv = require("ajv");
const ajv = new Ajv();

const orderSchema = {
  type: "object",
  properties: {
    products: {
      type: "array",
      items: {
        type: "object",
        properties: {
          product_name: { type: "string" },
          product_image: { type: "string" },
          price: { type: "number" },
          quantity: { type: "number" },
          product_details: { type: "string" },
        },
        required: ["product_name", "price", "quantity"],
      },
    },
    status: {
      type: "string",
      enum: ["Pending", "Accepted", "Canceled"],
    },
  },
  required: ["status"],
  additionalProperties: false,
};

module.exports = ajv.compile(orderSchema);
