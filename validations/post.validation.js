const joi = require('joi');
const { postLocation1, postLocation2 } = require('../static/postLocation');

const postLocationValidation = joi.object().keys({
  postLocation1: joi.string().allow('').not('undefined'),
  postLocation2: joi.string().allow('').not('undefined'),
  page: joi.number().not('NaN').allow(''),
  type: joi.string().valid('recent', 'trend', ''),
  search: joi.string().allow('', null),
});

const createPostValidation = joi.object().keys({
  title: joi.string().trim().required().min(1).max(100).not(''),
  content: joi.string().trim().required().min(1).max(10000).not(''),
  postLocation1: joi
    .string()
    .required()
    .valid(...postLocation1),
  postLocation2: joi
    .string()
    .required()
    .valid(...postLocation2),
  userId: joi.number().required(),
  email: joi.string().required(),
  postImage: joi.string(),
});

const postIdValidation = joi.number().required();

const PreviousPostValidation = joi.object().keys({
  postId: joi.number().required(),
  userId: joi.number().required(),
});

const updatePostValidation = joi.object().keys({
  postId: joi.number().required(),
  title: joi.string().trim().required().min(1).max(100).not(''),
  content: joi.string().trim().required().min(1).max(10000).not(''),
  postLocation1: joi
    .string()
    .required()
    .valid(...postLocation1),
  postLocation2: joi
    .string()
    .required()
    .valid(...postLocation2),
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
