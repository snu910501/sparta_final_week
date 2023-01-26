const PostRepository = require('../repositories/posts.repository');
const PostS3Repository = require('../repositories/posts.s3.repository');
const {
  createPostValidation,
  postLocationValidation,
  postIdValidation,
  PreviousPostValidation,
  updatePostValidation,
  userIdValidation,
} = require('../validations/post.validation');
const { Posts } = require('../models');
const s3 = require('../config/aws.post.s3');
const { badRequest, forbidden } = require('@hapi/boom');

class PostService {
  constructor() {
    this.postRepository = new PostRepository(Posts);
    this.postS3Repository = new PostS3Repository(s3);
  }

  getLocationPosts = async (getPostInfo) => {
    let pageNum = 0;
    let order = [
      ['commentsCount', 'DESC'],
      ['createdAt', 'DESC'],
    ];
    let searchWord = '';

    const { postLocation1, postLocation2, page, type, search } =
      await postLocationValidation.validateAsync(getPostInfo);

    if (!postLocation1 && postLocation2) throw badRequest('지역선택1 없음');

    if (!page) pageNum = 1;
    else pageNum = page;

    if (search) searchWord = search;

    if (type === 'recent') order = [['createdAt', 'DESC']];
    if (type === 'trend')
      order = [
        ['commentsCount', 'DESC'],
        ['createdAt', 'DESC'],
      ];

    const posts = await this.postRepository.getLocationPosts(
      postLocation1,
      postLocation2,
      pageNum,
      order,
      searchWord,
    );

    return posts;
  };

  createPost = async (postInput) => {
    const { email, ...postInfo } = await createPostValidation.validateAsync(
      postInput,
    );
    postInfo.email = email.split('@')[0];
    await this.postRepository.createPost(postInfo);
  };

  getDetailPost = async (postId) => {
    await postIdValidation.validateAsync(postId);
    const post = await this.postRepository.getDetailPost(postId);

    if (!post.postId) throw badRequest('존재하지 않는 게시글');

    return post;
  };

  getWrotePost = async (postId, userId) => {
    await PreviousPostValidation.validateAsync({ postId, userId });
    const existPost = await this.postRepository.getWrotePost(postId);

    if (!existPost) throw badRequest('존재하지 않는 게시글');
    if (userId !== existPost.userId) throw forbidden('사용자정보 불일치');

    return existPost;
  };

  getPreviousPost = async (postId) => {
    await postIdValidation.validateAsync(postId);
    const existPost = await this.postRepository.getDetailPost(postId);

    if (!existPost) throw badRequest('존재하지 않는 현재 게시글');

    const post = await this.postRepository.getPreviousPost(postId);

    if (!post) throw badRequest('존재하지 않는 이전 게시글');

    return post;
  };

  getNextPost = async (postId) => {
    await postIdValidation.validateAsync(postId);
    const existPost = await this.postRepository.getDetailPost(postId);

    if (!existPost) throw badRequest('존재하지 않는 현재 게시글');

    const post = await this.postRepository.getNextPost(postId);

    if (!post) throw badRequest('존재하지 않는 다음 게시글');

    return post;
  };

  updatePost = async (postInfo) => {
    const { userId, postId, postImage, ...Info } =
      await updatePostValidation.validateAsync(postInfo);
    const post = await this.postRepository.getDetailPost(postId);

    if (!post) throw badRequest('존재하지 않는 게시글');
    if (userId !== post.userId) throw forbidden('사용자정보 불일치');
    Info.postImage = postImage;

    await this.postRepository.updatePost(postId, Info);

    if (postImage && post.postImage) {
      const imageKey =
        post.postImage.split('/')[post.postImage.split('/').length - 1];
      await this.postS3Repository.deleteS3Image(imageKey);
    }
  };

  deletePost = async (postId, userId) => {
    await PreviousPostValidation.validateAsync({ postId, userId });

    const post = await this.postRepository.getPreviousPost(postId);

    if (!post) throw badRequest('존재하지 않는 게시글');
    if (userId !== post.userId) throw forbidden('사용자정보 불일치');

    await this.postRepository.deletePost(postId);

    if (post.postImage) {
      const imageKey =
        post.postImage.split('/')[post.postImage.split('/').length - 1];
      await this.postS3Repository.deleteS3Image(imageKey);
    }
  };

  //저장소 이미지 삭제
  deleteS3Image = async (postKey) => {
    const imageKey = postKey.split('/')[postKey.split('/').length - 1];
    await this.postS3Repository.deleteS3Image(imageKey);
  };

  getMyPost = async (userId) => {
    await userIdValidation.validateAsync(userId);
    const myposts = await this.postRepository.getMyPost(userId);

    return myposts;
  };
}

module.exports = PostService;
