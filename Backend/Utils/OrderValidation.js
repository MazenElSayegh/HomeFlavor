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
       
      },
    },
    status: {
      type: "string",
      enum: ["Pending", "Accepted", "Cancelled"],
    },
    user_id: { type: "string" },
    store_id: { type: "string" },
  },
  additionalProperties: false,
  required: ["user_id", "store_id", "products"],
};

module.exports = ajv.compile(orderSchema);
