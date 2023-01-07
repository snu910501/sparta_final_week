const CommentRepository = require('../repositories/comments.repository');
const postRepository = require('../repositories/posts.repository');
const { Posts, Comments } = require('../models');
const {
  createCommentValidation,
  updateCommentValidation,
  deleteCommentValidation,
} = require('../validations/comment.validation');
const { postIdValidation } = require('../validations/post.validation');

class CommentService {
  constructor() {
    this.commentRepsitory = new CommentRepository(Comments);
    this.postRepository = new postRepository(Posts);
  }

  createComment = async (userId, postId, content) => {
    await createCommentValidation.validateAsync({ userId, postId, content });
    const existPost = await this.postRepository.getDetailPost(postId);

    if (!existPost) throw { msg: '존재하지 않는 게시글', code: 400 };

    await this.commentRepsitory.createComment(userId, postId, content);
  };
  getComments = async (postId) => {
    await postIdValidation.validateAsync(postId);
    const existPost = await this.postRepository.getDetailPost(postId);

    if (!existPost) throw { msg: '존재하지 않는 게시글', code: 400 };

    const comments = await this.commentRepsitory.getComments(postId);

    return comments;
  };
  updateComment = async (userId, commentId, content) => {
    await updateCommentValidation.validateAsync({ userId, commentId, content });
    const comment = await this.commentRepsitory.getComment(commentId);

    if (!comment) throw { msg: '존재하지 않는 댓글', code: 400 };
    if (userId !== comment.userId)
      throw { msg: '사용자 정보 불일치', code: 403 };

    await this.commentRepsitory.updateComment(commentId, content);
  };
  deleteComment = async (userId, commentId) => {
    await deleteCommentValidation.validateAsync({ userId, commentId });
    const comment = await this.commentRepsitory.getComment(commentId);

    if (!comment) throw { msg: '존재하지 않는 댓글', code: 400 };
    if (userId !== comment.userId)
      throw { msg: '사용자 정보 불일치', code: 403 };

    await this.commentRepsitory.deleteComment(commentId);
  };
}

module.exports = CommentService;
