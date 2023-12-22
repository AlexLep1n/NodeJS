function checkUserParams(schema) {
  return (req, res, next) => {
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      return res.status(400).send(validationResult.error.details);
    } else {
      next();
    }
  };
}

function checkUserId(schema) {
  return (req, res, next) => {
    const validationResult = schema.validate(req.params);
    if (validationResult.error) {
      return res.status(400).send(validationResult.error.details);
    } else {
      next();
    }
  };
}

module.exports = { checkUserParams, checkUserId };
