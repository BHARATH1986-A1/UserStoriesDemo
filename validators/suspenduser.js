const { Validator } = require('jsonschema');

const validateJson = new Validator();
const schema = {
  type: 'object',
  properties: {
    userid: { type: 'string' }
  },
  required: ['userid']
};
module.exports = (jsonInstance) => (validateJson.validate(jsonInstance, schema));
