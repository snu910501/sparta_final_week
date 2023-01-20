const joi = require('joi');

const createCommentValidation = joi.object().keys({
  userId: joi.number().required(),
  postId: joi.number().required(),
  content: joi.string().trim().required().min(1).max(200).not(''),
});

const updateCommentValidation = joi.object().keys({
  userId: joi.number().required(),
  commentId: joi.number().required(),
  content: joi.string().trim().required().min(1).max(200).not(''),
});

const deleteCommentValidation = joi.object().keys({
  userId: joi.number().required(),
  commentId: joi.number().required(),
});

module.exports = {
  createCommentValidation,
  updateCommentValidation,
  deleteCommentValidation,
};
