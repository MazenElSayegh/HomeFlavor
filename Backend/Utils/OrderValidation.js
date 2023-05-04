const Ajv = require("ajv");
const ajv = new Ajv();

const orderSchema = {
    type: "object",
    properties: {
       
        products:{
            type: "array"
        },
        status: {
            type: "string",
            enum:['Pending', 'Accepted', 'Canceled']
        }
    },
    required: ["status"],
    additionalProperties: false,
}


module.exports = ajv.compile(orderSchema)