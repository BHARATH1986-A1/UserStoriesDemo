const { Validator } = require('jsonschema');

const validateJson = new Validator();
const schema = {
  type: 'object',
  properties: {
    team: { type: 'number' },
    notification: { type: 'string' }
  },
  required: ['notification'],
  additionalProperties: false
};
module.exports = (jsonInstance) => (validateJson.validate(jsonInstance, schema));
