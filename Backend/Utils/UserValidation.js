const Ajv = require("ajv").default;
var ajv = new Ajv();

ajv.addFormat("email", {
  type: "string",
  validate: (value) => {
    return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value);
  },
});

userSchema = {
  type: "object",
  properties: {
    user_name: { type: "string", pattern: "^[a-zA-Z0-9]+$" },
    email: {
      type: "string",
      format: "email",
    },
    password: { type: "string", minLength: 5 },
    gender: { type: "string", enum: ["male", "female"] },
    user_image: { type: "string" },
    role: { type: "string", enum: ["admin", "buyer", "seller"] },
    mobile: { type: "number"},
    address: { type: "string"},
  },
  required: ["user_name", "email", "password", "gender", "role","address","mobile"],
};

module.exports = ajv.compile(userSchema);
