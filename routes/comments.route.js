const { Router } = require('express');
const CommentController = require('../controllers/comments.controller');
const commentRouter = Router();
const commentController = new CommentController();

commentRouter.post('/posts/:postId/comments', commentController.createComment);
commentRouter.get('/posts/:postId/comments', commentController.getComments);
commentRouter.put('/comments/:commentId', commentController.updateComment);
commentRouter.delete('/comments/:commentId', commentController.deleteComment);

module.exports = commentRouter;
