const { Router } = require('express');
const CommentController = require('../controllers/comments.controller');
const commentRouter = Router();
const commentController = new CommentController();
const { isLoggedIn } = require('../middlewares/auth');
const {
  getApiLimiter,
  commentCUDApiLimiter,
} = require('../middlewares/apilimitrater');
const { commentSanitizer } = require('../middlewares/sanitizer');

//댓글 작성
commentRouter.post(
  '/posts/:postid/comments',
  isLoggedIn,
  commentCUDApiLimiter,
  commentSanitizer,
  commentController.createComment,
);

//특정 게시글의 댓글 조회
commentRouter.get(
  '/posts/:postid/comments',
  getApiLimiter,
  commentController.getComments,
);

//댓글 수정
commentRouter.put(
  '/comments/:commentid',
  isLoggedIn,
  commentCUDApiLimiter,
  commentSanitizer,
  commentController.updateComment,
);

//댓글 삭제
commentRouter.delete(
  '/comments/:commentid',
  isLoggedIn,
  commentCUDApiLimiter,
  commentController.deleteComment,
);

//대댓글 작성
commentRouter.post(
  '/posts/:postid/comments/:commentid',
  isLoggedIn,
  commentCUDApiLimiter,
  commentSanitizer,
  commentController.createReComment,
);

//내가 작성한 댓글 조회
commentRouter.get(
  '/comments/me',
  isLoggedIn,
  getApiLimiter,
  commentController.getMyComments,
);

module.exports = commentRouter;
