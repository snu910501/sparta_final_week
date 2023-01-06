const CommentService = require('../services/comments.service');

class CommentController {
  constructor() {
    this.commentService = new CommentService();
  }
  createComment = async (req, res, next) => {
    try {
      // const { userId } = res.locals;
      const userId = 1;
      const { postId } = req.params;
      const { content } = req.body;
      await this.commentService.createComment(userId, postId, content);
      return res.status(200).json({ msg: '작성 성공' });
    } catch (err) {
      if (err.isJoi === true)
        return res.status(400).json({ errorMsg: '유효성 검사 에러' });
      return res
        .status(err.code || 500)
        .json({ msd: err.msg || '알수없는 에러' });
    }
  };
  getComments = async (req, res, next) => {
    try {
      const { postId } = req.params;
      const comments = await this.commentService.getComments(postId);
      return res.status(200).json({ comments });
    } catch (err) {
      console.error(err);
      if (err.isJoi === true)
        return res.status(400).json({ errorMsg: '유효성 검사 에러' });
      return res
        .status(err.code || 500)
        .json({ msd: err.msg || '알수없는 에러' });
    }
  };
  updateComment = async (req, res, next) => {
    try {
      // const { userId } = res.locals;
      const userId = 1;
      const { commentId } = req.params;
      const { content } = req.body;
      await this.commentService.updateComment(userId, commentId, content);
      return res.status(200).json({ msg: '수정 성공' });
    } catch (err) {
      if (err.isJoi === true)
        return res.status(400).json({ errorMsg: '유효성 검사 에러' });
      return res
        .status(err.code || 500)
        .json({ msd: err.msg || '알수없는 에러' });
    }
  };
  deleteComment = async (req, res, next) => {
    try {
      // const { userId } = res.locals;
      const userId = 1;
      const { commentId } = req.params;
      await this.commentService.deleteComment(userId, commentId);
      return res.status(200).json({ msg: '삭제 성공' });
    } catch (err) {
      if (err.isJoi === true)
        return res.status(400).json({ errorMsg: '유효성 검사 에러' });
      return res
        .status(err.code || 500)
        .json({ msd: err.msg || '알수없는 에러' });
    }
  };
}

module.exports = CommentController;
