const { Comments } = require('../models');
const { Sequelize, Op } = require('sequelize');

class PostRepository {
  constructor(postsModel) {
    this.postsModel = postsModel;
  }

  getLocationPosts = async (postLocation1, postLocation2, page) => {
    let whereLocation = {};
    if (postLocation1) {
      whereLocation = postLocation2
        ? { [Op.and]: [{ postLocation1 }, { postLocation2 }] }
        : { postLocation1 };
    }
    const posts = await this.postsModel.findAll({
      subQuery: false,
      where: whereLocation,
      order: [
        ['commentsCount', 'DESC'],
        ['createdAt', 'DESC'],
      ],
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
      limit: 24,
      offset: 24 * (page - 1),
    });
    return posts;
  };

  getRecentPosts = async (postLocation1, postLocation2, page) => {
    let whereLocation = {};
    if (postLocation1) {
      whereLocation = postLocation2
        ? { [Op.and]: [{ postLocation1 }, { postLocation2 }] }
        : { postLocation1 };
    }
    const posts = await this.postsModel.findAll({
      subQuery: false,
      where: whereLocation,
      order: [['createdAt', 'DESC']],
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
      limit: 24,
      offset: 24 * (page - 1),
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
    const post = await this.postsModel.findOne({
      where: { postId: { [Op.lt]: postId } },
      order: [['postId', 'DESC']],
    });
    return post;
  };

  getNextPost = async (postId) => {
    const post = await this.postsModel.findOne({
      where: { postId: { [Op.gt]: postId } },
    });
    return post;
  };

  getSearchedPost = async (searchedWord) => {
    const posts = await this.postsModel.findAll({
      subQuery: false,
      where: {
        [Op.or]: [
          { content: { [Op.like]: `%${searchedWord}%` } },
          { title: { [Op.like]: `%${searchedWord}%` } },
          { email: { [Op.like]: `%${searchedWord}%` } },
        ],
      },
      order: [
        ['commentsCount', 'DESC'],
        ['postId', 'DESC'],
      ],
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
    });
    return posts;
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
      attributes: ['title', 'content', 'createdAt'],
    });
    return myposts;
  };
}

module.exports = PostRepository;
