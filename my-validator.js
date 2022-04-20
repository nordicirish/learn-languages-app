const Validator = require("jsonschema").Validator;
const validator = new Validator();

const validate = (value, schema) => {
  const val = validator.validate(value, schema);
  return {
    success: val.errors.length === 0,
    errors: val.errors,
  };
};

module.exports = validate;
