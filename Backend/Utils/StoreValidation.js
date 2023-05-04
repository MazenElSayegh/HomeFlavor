const Ajv = require("ajv");
const ajv = new Ajv();

const storeSchema = {
  type: "object",
  properties: {
    user_id: { type: "string" },
    name: { type: "string" },
    image: { type: "string" },
    city: { type: "string" },
  },
  required: ["user_id", "name", "image", "city"],
  additionalProperties: false,
};

const menuSchema = {
  type: "object",
  properties: {
    product_title: { type: "string" },
    product_image: { type: "string" },
    price: { type: "number" },
    product_details: { type: "string" },
  },
  required: ["product_title", "product_image", "price", "product_details"],
  additionalProperties: false,
};

const feedbackSchema = {
  type: "object",
  properties: {
    user_id: { type: "string" },
    comment: { type: "string" },
    date: { type: "string" },
    stars: { type: "number", minimum: 1, maximum: 5 },
  },
  required: ["user_id", "comment", "date", "stars"],
  additionalProperties: false,
};

module.exports = {
  validateStore: ajv.compile(storeSchema),
  validateMenu: ajv.compile(menuSchema),
  validateFeedback: ajv.compile(feedbackSchema),
};
