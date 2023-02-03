const { Comments } = require('../models');
const { Sequelize, Op } = require('sequelize');

class PostRepository {
  constructor(postsModel) {
    this.postsModel = postsModel;
  }

  getLocationPosts = async (whereLocation, page, order) => {
    const posts = await this.postsModel.findAll({
      subQuery: false,
      where: whereLocation,
      order: order,
      attributes: [
        'postId',
        'postImage',
        'title',
        'content',
        'postLocation1',
        'postLocation2',
        'createdAt',
        'email',
        [
          Sequelize.fn('COUNT', Sequelize.col('Comments.commentId')),
          'commentsCount',
        ],
      ],
      include: [{ model: Comments, attributes: [] }],
      group: 'postId',
      limit: 12,
      offset: 12 * (page - 1),
    });
    return posts;
  };

  createPost = async (postInfo) => {
    await this.postsModel.create(postInfo);
  };

  getDetailPost = async (postId) => {
    const post = await this.postsModel.findOne({
      where: { postId },
    });
    return post;
  };

  getWrotePost = async (postId) => {
    const existPostContent = await this.postsModel.findByPk(postId);
    return existPostContent;
  };

  getPreviousPost = async (postId) => {
    const previoustPost = await this.postsModel.findOne({
      where: { postId: { [Op.lt]: postId } },
      order: [['postId', 'DESC']],
      attributes: ['postId', 'title'],
    });
    return previoustPost;
  };

  getNextPost = async (postId) => {
    const nextPost = await this.postsModel.findOne({
      where: { postId: { [Op.gt]: postId } },
      attributes: ['postId', 'title'],
    });
    return nextPost;
  };

  updatePost = async (postId, postInfo) => {
    await this.postsModel.update(postInfo, { where: { postId } });
  };

  deletePost = async (postId) => {
    await this.postsModel.destroy({ where: { postId } });
  };

  getMyPost = async (userId) => {
    const myposts = await this.postsModel.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']],
      attributes: ['postId', 'title', 'content', 'createdAt'],
    });
    return myposts;
  };
}

module.exports = PostRepository;
