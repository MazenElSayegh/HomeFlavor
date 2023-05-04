const Ajv = require("ajv").default;
var ajv = new Ajv();
userSchema = {
  type: "object",
  properties: {
    user_name: { type: "string", pattern: "^[a-zA-Z]+$" },
    email: {
      type: "string",
      pattern: "^[a-zA-Z0-9]+@{1}[a-zA-Z0-9]+(.com){1}$",
    },
    password: { type: "string", minLength: 5 },
    gender: { type: "string", enum: ["male", "female"] },
    store_id: { type: "number" },
    user_image: { type: "string" },
    role: { type: "string" },
  },
  required: ["user_name", "email", "password"],
};

module.exports = ajv.compile(userSchema);
