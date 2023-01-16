const { Users } = require('../models');
const { Sequelize } = require('sequelize');
class CommentRepository {
  constructor(commentsModel) {
    this.commentsModel = commentsModel;
  }

  createComment = async (userId, postId, content) => {
    await this.commentsModel.create({ userId, postId, content });
  };

  getComments = async (postId) => {
    const comments = await this.commentsModel.findAll({
      where: { postId },
      attributes: [
        'content',
        [Sequelize.col('User.nickname'), 'nickname'],
        [Sequelize.col('User.profileImg'), 'profileImg'],
      ],
      include: [{ model: Users, attributes: [] }],
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
