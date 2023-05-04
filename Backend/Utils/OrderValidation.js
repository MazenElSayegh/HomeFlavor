const Ajv = require("ajv");
const ajv = new Ajv();

const studentSchema = {
    type: "object",
    properties: {
        name: { type: "string", pattern: "[a-zA-Z]{3,}$" },
        age: { type: "number", minimum: 15, maximum: 50 }
    },
    required: ["name", "age"],
    additionalProperties: false,
};

module.exports = ajv.compile(studentSchema)