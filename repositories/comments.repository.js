const { Users, Comments } = require('../models');
const { Sequelize, Op } = require('sequelize');
class CommentRepository {
  constructor(commentsModel) {
    this.commentsModel = commentsModel;
  }

  createComment = async (userId, postId, content) => {
    await this.commentsModel.create({ userId, postId, content });
  };

  getComments = async (postId) => {
    const comments = await this.commentsModel.findAll({
      where: { [Op.and]: [{ postId }, { parentCommentId: null }] },
      attributes: [
        'content',
        'createdAt',
        [Sequelize.col('User.nickname'), 'nickname'],
        [Sequelize.col('User.profileImg'), 'profileImg'],
      ],
      include: [
        { model: Users, attributes: [] },
        {
          model: Comments,
          as: 'reComments',
          required: false,
          attributes: ['content', 'createdAt'],
          include: [{ model: Users, attributes: ['nickname', 'profileImg'] }],
        },
      ],
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
  createReComment = async (userId, postId, content, parentCommentId) => {
    await this.commentsModel.create({
      userId,
      postId,
      content,
      parentCommentId,
    });
  };
}

module.exports = CommentRepository;
