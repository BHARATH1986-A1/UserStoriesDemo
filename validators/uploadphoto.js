const { Validator } = require('jsonschema');
const isbase64 = require('is-base64');

Validator.prototype.customFormats.base64Format = (input) => (isbase64(input, { allowMime: true }));

const validateJson = new Validator();
const schema = {
  type: 'object',
  properties: {
    userid: { type: 'number' },
    photo: { type: 'string', format: 'base64Format' }
  },
  required: ['userid', 'photo'],
  additionalProperties: false
};

module.exports = (jsonInstance) => (validateJson.validate(jsonInstance, schema));
