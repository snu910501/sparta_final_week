const { Router } = require('express');
const CommentController = require('../controllers/comments.controller');
const commentRouter = Router();
const commentController = new CommentController();
const { isLoggedIn } = require('../middlewares/auth');
const {
  getApiLimiter,
  commentCUDApiLimiter,
} = require('../middlewares/apilimitrater');

commentRouter.post(
  '/posts/:postid/comments',
  isLoggedIn,
  commentCUDApiLimiter,
  commentController.createComment,
);

commentRouter.get(
  '/posts/:postid/comments',
  getApiLimiter,
  commentController.getComments,
);

commentRouter.put(
  '/comments/:commentid',
  isLoggedIn,
  commentCUDApiLimiter,
  commentController.updateComment,
);

commentRouter.delete(
  '/comments/:commentid',
  isLoggedIn,
  commentCUDApiLimiter,
  commentController.deleteComment,
);

commentRouter.post(
  '/posts/:postid/comments/:commentid',
  isLoggedIn,
  commentCUDApiLimiter,
  commentController.createReComment,
);

commentRouter.get(
  '/comments/me',
  isLoggedIn,
  getApiLimiter,
  commentController.getMyComments,
);

module.exports = commentRouter;
