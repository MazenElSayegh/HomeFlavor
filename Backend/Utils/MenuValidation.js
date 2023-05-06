const Ajv = require("ajv");
const ajv = new Ajv();

const menuSchema = {
  type: "object",
  properties: {
    product_title: { type: "string" },
    product_image: { type: "string" },
    price: { type: "number" },
    product_details: { type: "string" },
  },
  required: [
    "product_title",
    "product_image",
    "price",
    "product_details",
  ],
};

module.exports = ajv.compile(menuSchema);
