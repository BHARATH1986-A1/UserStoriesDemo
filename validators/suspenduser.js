const { Validator } = require('jsonschema');
const util = require('../utils/util');

Validator.prototype.customFormats.emailFormat = (input) => (util.emailValidate(input));

const validateJson = new Validator();
const schema = {
  type: 'object',
  properties: {
    userid: { type: 'string', format: 'emailFormat' }
  },
  required: ['userid'],
  additionalProperties: false
};
module.exports = (jsonInstance) => (validateJson.validate(jsonInstance, schema));
