const { Users } = require('../models');

class CommentRepository {
  constructor(commentsModel) {
    this.commentsModel = commentsModel;
  }

  createComment = async (userId, postId, content) => {
    await this.commentsModel.create({ userId, postId, content });
  };
  //, 'profileImage' 넣을지 말지 정해야 됨
  getComments = async (postId) => {
    const comments = await this.commentsModel.findAll({
      where: { postId },
      include: [{ model: Users, attributes: ['nickname'] }],
    });
    return comments;
  };

  getComment = async (commentId) => {
    const comment = await this.commentsModel.findOne({ where: { commentId } });
    return comment;
  };

  updateComment = async (commentId, content) => {
    await this.commentsModel.update({ content }, { where: { commentId } });
  };

  deleteComment = async (commentId) => {
    await this.commentsModel.destroy({ where: { commentId } });
  };
}

module.exports = CommentRepository;
