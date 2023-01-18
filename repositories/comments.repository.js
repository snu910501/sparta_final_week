const { Users, Comments, Posts } = require('../models');
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
        'commentId',
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
