const joi = require('joi');

const postLocationValidation = joi.string().required();

const createPostValidation = joi.object().keys({
  title: joi.string().required().min(1).max(50),
  content: joi.string().required().min(1).max(10000),
  postLocation: joi.string().required(),
  userId: joi.number().required(),
  postImage: joi.string(),
});

const postIdValidation = joi.number().required();

const PreviousPostValidation = joi.object().keys({
  postId: joi.number().required(),
  userId: joi.number().required(),
});

const updatePostValidation = joi.object().keys({
  postId: joi.number().required(),
  title: joi.string().required().min(1).max(50),
  content: joi.string().required().min(1).max(10000),
  userId: joi.number().required(),
  postImage: joi.string(),
});

module.exports = {
  createPostValidation,
  postLocationValidation,
  postIdValidation,
  PreviousPostValidation,
  updatePostValidation,
};
