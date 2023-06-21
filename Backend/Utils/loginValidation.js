const Ajv = require("ajv");
const ajv = new Ajv();


const loginSchema = {
  type: "object",
  properties: {
    email: {
      type: "string",
      pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
    },
    password: { type: "string", minLength: 5 },
  },
  required: ["email", "password"],
  additionalProperties: false,
};
module.exports = ajv.compile(loginSchema);
