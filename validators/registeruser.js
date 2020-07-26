const { Validator } = require('jsonschema');
const util = require('../utils/util');

Validator.prototype.customFormats.emailFormat = (input) => (util.emailValidate(input));

const validateJson = new Validator();
const vschema = {
  type: 'object',
  properties: {
    teamid: { type: 'number' },
    users: {
      type: 'array',
      minItems: 1,
      items: {
        type: 'string',
        format: 'emailFormat'
      }
    }
  },
  required: ['teamid', 'users'],
  additionalProperties: false
};
module.exports = (jsonInstance) => (validateJson.validate(jsonInstance, vschema));
