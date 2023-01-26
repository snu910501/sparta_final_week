const { Users, Comments, Posts } = require('../models');
const { Sequelize, Op } = require('sequelize');
class CommentRepository {
  constructor(commentsModel) {
    this.commentsModel = commentsModel;
  }

  createComment = async (commentInfo) => {
    await this.commentsModel.create(commentInfo);
  };

  getComments = async (postId) => {
    const comments = await this.commentsModel.findAll({
      where: { [Op.and]: [{ postId }, { parentCommentId: null }] },
      attributes: ['commentId', 'content', 'createdAt', 'email'],
      include: [
        {
          model: Comments,
          as: 'reComments',
          required: false,
          attributes: ['commentId', 'content', 'createdAt', 'email'],
        },
      ],
    });
    return comments;
  };

  getComment = async (commentId) => {
    const comment = await this.commentsModel.findOne({ where: { commentId } });
    return comment;
  };

  getParentComment = async (postId, commentId) => {
    const comment = await this.commentsModel.findOne({
      where: { [Op.and]: [{ postId }, { commentId }] },
    });
    return comment;
  };

  updateComment = async (commentId, content) => {
    await this.commentsModel.update({ content }, { where: { commentId } });
  };

  deleteComment = async (commentId) => {
    await this.commentsModel.destroy({ where: { commentId } });
  };

  createReComment = async (reCommentInfo) => {
    await this.commentsModel.create(reCommentInfo);
  };

  getMyComments = async (userId) => {
    const myComments = await this.commentsModel.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']],
      attributes: [
        'content',
        'createdAt',
        [Sequelize.col('Post.title'), 'title'],
      ],
      include: [{ model: Posts, attributes: [] }],
    });
    return myComments;
  };
}

module.exports = CommentRepository;
