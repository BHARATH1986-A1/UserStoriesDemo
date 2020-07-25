const { Validator } = require('jsonschema');

const validateJson = new Validator();
const vschema = {
  type: 'object',
  properties: {
    teamid: { type: 'number' },
    users: {
      type: 'array',
      minItems: 1,
      items: {
        type: 'string'
      }
    }
  },
  required: ['teamid', 'users'],
  additionalProperties: false
};
module.exports = (jsonInstance) => (validateJson.validate(jsonInstance, vschema));
