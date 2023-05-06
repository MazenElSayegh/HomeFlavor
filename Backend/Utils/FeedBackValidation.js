const Ajv = require("ajv");
const ajv = new Ajv();

const feedbackSchema = {
  type: "object",
  properties: {
    user_id: { type: "string" },
    comment: { type: "string" },
    date: { type: "string" },
    stars: { type: "number", minimum: 1, maximum: 5 },
  },
  required: ["user_id", "comment", "date", "stars"],
    
};

module.exports = ajv.compile(feedbackSchema);
