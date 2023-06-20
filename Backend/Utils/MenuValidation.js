const Ajv = require("ajv");
const ajv = new Ajv();

const menuSchema = {
  type: "object",
  properties: {
    product_title: { type: "string" },
    product_image: { type: "string" },
    price: { type: "string" },
    product_details: { type: "string" },
    category: {
      type: "string",
      enum: ["Appetizer", "Drink", "Main"],
    },
  },
  required: ["product_title", "price", "product_details", "category"],
};

module.exports = ajv.compile(menuSchema);
