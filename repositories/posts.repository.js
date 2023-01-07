const { Users } = require('../models');

class PostRepository {
  constructor(postsModel) {
    this.postsModel = postsModel;
  }

  //, 'profileImg' 인클루드에 넣어야함
  getLocationPosts = async (postLocation) => {
    const posts = await this.postsModel.findAll({
      where: { postLocation },
      order: [['postId', 'DESC']],
      include: [{ model: Users, attributes: ['nickname'] }],
    });
    return posts;
  };

  createPost = async (title, content, postLocation, userId, postImage) => {
    await this.postsModel.create({
      title,
      content,
      postLocation,
      userId,
      postImage,
    });
  };

  //, 'profileImg' 인클루드에 넣어야함
  getDetailPost = async (postId) => {
    const post = await this.postsModel.findOne({
      where: { postId },
      include: [{ model: Users, attributes: ['nickname'] }],
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
}

module.exports = PostRepository;
