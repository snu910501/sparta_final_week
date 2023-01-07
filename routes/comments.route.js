const { Router } = require('express');
const CommentController = require('../controllers/comments.controller');
const commentRouter = Router();
const commentController = new CommentController();

commentRouter.post('/posts/:postid/comments', commentController.createComment);
commentRouter.get('/posts/:postid/comments', commentController.getComments);
commentRouter.put('/comments/:commentid', commentController.updateComment);
commentRouter.delete('/comments/:commentid', commentController.deleteComment);

module.exports = commentRouter;
