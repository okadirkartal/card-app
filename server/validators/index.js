exports.addCardValidator = (req, res, next) => {
  req.check("title", "Title is required").notEmpty();
}
