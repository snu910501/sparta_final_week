const joi = require('joi');

const postLocationValidation = joi.object().keys({
  postLocation1: joi.string(),
  postLocation2: joi.string(),
});

const createPostValidation = joi.object().keys({
  title: joi.string().required().min(1).max(50),
  content: joi.string().required().min(1).max(10000),
  postLocation1: joi.string().required(),
  postLocation2: joi.string().required(),
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

const userIdValidation = joi.number().required();

module.exports = {
  createPostValidation,
  postLocationValidation,
  postIdValidation,
  PreviousPostValidation,
  updatePostValidation,
  userIdValidation,
};
