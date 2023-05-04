const Ajv = require("ajv");
const ajv = new Ajv();

const loginSchema = {
  type: "object",
  properties: {
    email: {
      type: "string",
      pattern: "^[a-zA-Z0-9]+@{1}[a-zA-Z0-9]+(.com){1}$",
    },
    password: { type: "string", minLength: 5 },
  },
  required: ["email", "password"],
  additionalProperties: false,
};
module.exports = ajv.compile(loginSchema);
