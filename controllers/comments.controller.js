const CommentService = require('../services/comments.service');

class CommentController {
  constructor() {
    this.commentService = new CommentService();
  }
  createComment = async (req, res, next) => {
    try {
      const { userId, email } = res.locals;
      const postId = req.params.postid;
      const { content } = req.filtered;
      await this.commentService.createComment({
        userId,
        email,
        postId,
        content,
      });
      return res.status(200).json({ msg: '댓글 작성 성공' });
    } catch (err) {
      next(err);
    }
  };

  getComments = async (req, res, next) => {
    try {
      const postId = req.params.postid;
      const comments = await this.commentService.getComments(postId);
      return res.status(200).json({ comments });
    } catch (err) {
      next(err);
    }
  };

  updateComment = async (req, res, next) => {
    try {
      const { userId } = res.locals;
      const commentId = req.params.commentid;
      const { content } = req.filtered;
      await this.commentService.updateComment(userId, commentId, content);
      return res.status(200).json({ msg: '수정 성공' });
    } catch (err) {
      next(err);
    }
  };

  deleteComment = async (req, res, next) => {
    try {
      const { userId } = res.locals;
      const commentId = req.params.commentid;
      await this.commentService.deleteComment(userId, commentId);
      return res.status(200).json({ msg: '삭제 성공' });
    } catch (err) {
      next(err);
    }
  };

  createReComment = async (req, res, next) => {
    try {
      const { userId, email } = res.locals;
      const { postid: postId, commentid: commentId } = req.params;
      const { content } = req.filtered;
      await this.commentService.createReComment({
        userId,
        email,
        postId,
        content,
        commentId,
      });
      return res.status(200).json({ msg: '대댓글 작성 성공' });
    } catch (err) {
      next(err);
    }
  };

  getMyComments = async (req, res, next) => {
    try {
      const { userId } = res.locals;
      const comments = await this.commentService.getMyComments(userId);
      res.status(200).json({ comments });
    } catch (err) {
      next(err);
    }
  };
}

module.exports = CommentController;
