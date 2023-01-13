const { Users, Comments } = require('../models');
const { Sequelize, Op } = require('sequelize');

class PostRepository {
  constructor(postsModel) {
    this.postsModel = postsModel;
  }

  getLocationPosts = async (postLocation1, postLocation2) => {
    let whereLocation = {};
    if (postLocation1) {
      whereLocation = postLocation2
        ? { [Op.and]: [{ postLocation1 }, { postLocation2 }] }
        : { postLocation1 };
    }
    const posts = await this.postsModel.findAll({
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
        // 'postLocation1',
        // 'postLocation2',
        'createdAt',
        [
          Sequelize.fn('COUNT', Sequelize.col('Comments.commentId')),
          'commentsCount',
        ],
        [Sequelize.col('User.nickname'), 'nickname'],
      ],
      include: [
        { model: Users, attributes: [] },
        { model: Comments, attributes: [] },
      ],
      group: 'postId',
    });
    return posts;
  };

  createPost = async (
    title,
    content,
    postLocation1,
    postLocation2,
    userId,
    postImage,
  ) => {
    await this.postsModel.create({
      title,
      content,
      postLocation1,
      postLocation2,
      userId,
      postImage,
    });
  };

  getDetailPost = async (postId) => {
    const post = await this.postsModel.findOne({
      where: { postId },
      attributes: [
        'postId',
        'postImage',
        'title',
        'content',
        // 'postLocation1',
        // 'postLocation2',
        'createdAt',
        [Sequelize.col('User.nickname'), 'nickname'],
        [Sequelize.col('User.profileImg'), 'profileImg'],
      ],
      include: [{ model: Users, attributes: [] }],
    });
    return post;
  };

  getPreviousPost = async (postId) => {
    const existPostContent = await this.postsModel.findByPk(postId);
    return existPostContent;
  };

  updatePost = async (postId, title, content, postImage) => {
    await this.postsModel.update(
      { title, content, postImage },
      { where: { postId } },
    );
  };

  deletePost = async (postId) => {
    await this.postsModel.destroy({ where: { postId } });
  };

  getMyPost = async (userId) => {
    const myposts = await this.postsModel.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']],
      attributes: ['postId', 'title', 'createdAt'],
    });
    return myposts;
  };
}

module.exports = PostRepository;
