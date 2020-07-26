const { Validator } = require('jsonschema');
const isbase64 = require('is-base64');
const util = require('../utils/util');

Validator.prototype.customFormats.base64Format = (input) => (isbase64(input, { allowMime: true }));
Validator.prototype.customFormats.emailFormat = (input) => (util.emailValidate(input));

const validateJson = new Validator();
const schema = {
  type: 'object',
  properties: {
    userid: { type: 'string', format: 'emailFormat' },
    photo: { type: 'string', format: 'base64Format' }
  },
  required: ['userid', 'photo'],
  additionalProperties: false
};

module.exports = (jsonInstance) => (validateJson.validate(jsonInstance, schema));
