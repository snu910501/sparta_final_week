const joi = require('joi');

const postLocationValidation = joi.object().keys({
  postLocation1: joi.string().allow('').not('undefined'),
  postLocation2: joi.string().allow('').not('undefined'),
});

const createPostValidation = joi.object().keys({
  title: joi.string().trim().required().min(1).max(50),
  content: joi.string().trim().required().min(1).max(10000),
  postLocation1: joi.string().trim().required().not('undefined'),
  postLocation2: joi.string().trim().required().not('undefined'),
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
  title: joi.string().trim().required().min(1).max(50),
  content: joi.string().trim().required().min(1).max(10000),
  postLocation1: joi.string().trim().required().not('undefined'),
  postLocation2: joi.string().trim().required().not('undefined'),
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
