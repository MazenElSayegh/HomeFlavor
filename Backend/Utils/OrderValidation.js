const Ajv = require("ajv");
const ajv = new Ajv();

const orderSchema = {
    type: "object",
    properties: {
        products: { type: "string", pattern: "[a-zA-Z]{3,}$" },
        date: { type: "number", minimum: 15, maximum: 50 },
        status: { type: "number", minimum: 15, maximum: 50 },
        status: { type: "number", minimum: 15, maximum: 50 },
        status: { type: "number", minimum: 15, maximum: 50 },
    },
    required: ["name", "age"],
    additionalProperties: false,
};

module.exports = ajv.compile(studentSchema)