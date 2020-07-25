const { Validator } = require('jsonschema');

const validateJson = new Validator();
const schema = {
  type: 'object',
  properties: {
    team: { type: 'number' },
    notification: { type: 'string' }
  },
  required: ['team', 'notification']
};
module.exports = (jsonInstance) => (validateJson.validate(jsonInstance, schema));
