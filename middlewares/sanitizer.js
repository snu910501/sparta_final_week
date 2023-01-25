const sanitize = require('sanitize-html');

exports.postSanitizer = (req, res, next) => {
  const title = sanitize(req.body.title);
  const content = sanitize(req.body.content, {
    allowedTags: sanitize.defaults.allowedTags.concat(['img']),
  });
  const postLocation1 = sanitize(req.body.postLocation1);
  const postLocation2 = sanitize(req.body.postLocation2);
  req.filtered = { title, content, postLocation1, postLocation2 };
  next();
};

exports.commentSanitizer = (req, res, next) => {
  const content = sanitize(req.body.content);
  req.filtered = { content };
  next();
};
