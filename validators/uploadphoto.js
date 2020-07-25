const { Validator } = require('jsonschema');

const validateJson = new Validator();
const schema = {
  type: 'object',
  properties: {
    userid: { type: 'number' },
    photo: { type: 'string' }
  },
  required: ['userid', 'photo']
};
module.exports = (jsonInstance) => (validateJson.validate(jsonInstance, schema));
