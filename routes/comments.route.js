const { Router } = require('express');
const CommentController = require('../controllers/comments.controller');
const commentRouter = Router();
const commentController = new CommentController();
const { isLoggedIn } = require('../middlewares/auth');

commentRouter.post(
  '/posts/:postid/comments',
  isLoggedIn,
  commentController.createComment,
);
commentRouter.get('/posts/:postid/comments', commentController.getComments);
commentRouter.put(
  '/comments/:commentid',
  isLoggedIn,
  commentController.updateComment,
);
commentRouter.delete(
  '/comments/:commentid',
  isLoggedIn,
  commentController.deleteComment,
);

module.exports = commentRouter;
