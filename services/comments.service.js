const CommentRepository = require('../repositories/comments.repository');
const postRepository = require('../repositories/posts.repository');
const { Posts, Comments } = require('../models');
const {
  createCommentValidation,
  updateCommentValidation,
  deleteCommentValidation,
  createReCommentValidation,
} = require('../validations/comment.validation');
const {
  postIdValidation,
  userIdValidation,
} = require('../validations/post.validation');
const { badRequest, forbidden } = require('@hapi/boom');

class CommentService {
  constructor() {
    this.commentRepsitory = new CommentRepository(Comments);
    this.postRepository = new postRepository(Posts);
  }

  createComment = async (commentInput) => {
    const { postId, email, ...commentInfo } =
      await createCommentValidation.validateAsync(commentInput);
    const existPost = await this.postRepository.getDetailPost(postId);
    if (!existPost) throw badRequest('존재하지 않는 게시글');
    commentInfo.email = email.split('@')[0];
    commentInfo.postId = postId;
    await this.commentRepsitory.createComment(commentInfo);
  };

  getComments = async (postId) => {
    await postIdValidation.validateAsync(postId);
    const existPost = await this.postRepository.getDetailPost(postId);
    if (!existPost) throw badRequest('존재하지 않는 게시글');

    const comments = await this.commentRepsitory.getComments(postId);

    return comments;
  };

  updateComment = async (userId, commentId, content) => {
    await updateCommentValidation.validateAsync({ userId, commentId, content });
    const comment = await this.commentRepsitory.getComment(commentId);

    if (!comment) throw badRequest('존재하지 않는 댓글');
    if (userId !== comment.userId) throw forbidden('사용자 정보 불일치');

    await this.commentRepsitory.updateComment(commentId, content);
  };

  deleteComment = async (userId, commentId) => {
    await deleteCommentValidation.validateAsync({ userId, commentId });
    const comment = await this.commentRepsitory.getComment(commentId);

    if (!comment) throw badRequest('존재하지 않는 댓글');
    if (userId !== comment.userId) throw forbidden('사용자 정보 불일치');

    await this.commentRepsitory.deleteComment(commentId);
  };

  createReComment = async (commentInput) => {
    let parentCommentId = '';
    const { postId, commentId, email, ...commentInfo } =
      await createReCommentValidation.validateAsync(commentInput);
    const existPost = await this.postRepository.getDetailPost(postId);
    if (!existPost.postId) throw badRequest('존재하지 않는 게시글');
    const existParentComment = await this.commentRepsitory.getParentComment(
      postId,
      commentId,
    );
    if (!existParentComment) throw badRequest('존재하지 않는 상위 댓글');
    if (existParentComment.parentCommentId)
      parentCommentId = existComment.parentCommentId;
    else parentCommentId = commentId;
    commentInfo.email = email.split('@')[0];
    commentInfo.parentCommentId = parentCommentId;
    commentInfo.postId = postId;
    await this.commentRepsitory.createReComment(commentInfo);
  };

  getMyComments = async (userId) => {
    await userIdValidation.validateAsync(userId);
    const myComments = await this.commentRepsitory.getMyComments(userId);
    return myComments;
  };
}

module.exports = CommentService;
