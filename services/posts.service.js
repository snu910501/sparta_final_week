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
  //지역게시글 조회
  getLocationPosts = async (postLocation1, postLocation2) => {
    await postLocationValidation.validateAsync({
      postLocation1,
      postLocation2,
    });
    const posts = await this.postRepository.getLocationPosts(
      postLocation1,
      postLocation2,
    );

    if (posts.length === 0) throw badRequest('지역 게시물 없음');

    return posts;
  };
  //게시글 생성
  createPost = async (
    title,
    content,
    postLocation1,
    postLocation2,
    userId,
    postImage,
  ) => {
    await createPostValidation.validateAsync({
      title,
      content,
      postLocation1,
      postLocation2,
      userId,
      postImage,
    });
    await this.postRepository.createPost(
      title,
      content,
      postLocation1,
      postLocation2,
      userId,
      postImage,
    );
  };
  //게시글 상세조회
  getDetailPost = async (postId) => {
    await postIdValidation.validateAsync(postId);
    const post = await this.postRepository.getDetailPost(postId);

    if (!post.postId) throw badRequest('존재하지 않는 게시글');

    return post;
  };
  //수정전 게시글 불러오기
  getPreviousPost = async (postId, userId) => {
    await PreviousPostValidation.validateAsync({ postId, userId });
    const existPostContent = await this.postRepository.getPreviousPost(postId);

    if (!existPostContent) throw badRequest('존재하지 않는 게시글');
    if (userId !== existPostContent.userId)
      throw forbidden('사용자정보 불일치');

    return existPostContent;
  };
  //게시글 수정
  updatePost = async (postId, title, content, userId, postImage) => {
    await updatePostValidation.validateAsync({
      postId,
      title,
      content,
      userId,
      postImage,
    });
    const post = await this.postRepository.getPreviousPost(postId);

    if (!post) throw badRequest('존재하지 않는 게시글');
    if (userId !== post.userId) throw forbidden('사용자정보 불일치');
    await this.postRepository.updatePost(postId, title, content, postImage);
    if (postImage && post.postImage) {
      const imageKey =
        post.postImage.split('/')[post.postImage.split('/').length - 1];
      await this.postS3Repository.deleteS3Image(imageKey);
    }
  };

  //게시글 삭제
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

  //내가 쓴 게시글 조회
  getMyPost = async (userId) => {
    await userIdValidation.validateAsync(userId);
    const myposts = await this.postRepository.getMyPost(userId);
    return myposts;
  };
}

module.exports = PostService;
