const PostRepository = require('../repositories/posts.repository');
const PostS3Repository = require('../repositories/posts.s3.repository');
const {
  createPostValidation,
  postLocationValidation,
  postIdValidation,
  PreviousPostValidation,
  updatePostValidation,
} = require('../validations/post.validation');
const { Posts } = require('../models');
const s3 = require('../config/aws.post.s3');

class PostService {
  constructor() {
    this.postRepository = new PostRepository(Posts);
    this.postS3Repository = new PostS3Repository(s3);
  }
  //지역게시글 조회
  getLocationPosts = async (postLocation) => {
    await postLocationValidation.validateAsync(postLocation);
    const posts = await this.postRepository.getLocationPosts(postLocation);

    if (!posts) throw { msg: '지역 게시물 없음', code: 400 };

    return posts;
  };
  //게시글 생성
  createPost = async (title, content, postLocation, userId, postImage) => {
    await createPostValidation.validateAsync({
      title,
      content,
      postLocation,
      userId,
      postImage,
    });
    await this.postRepository.createPost(
      title,
      content,
      postLocation,
      userId,
      postImage,
    );
  };
  //게시글 상세조회
  getDetailPost = async (postId) => {
    await postIdValidation.validateAsync(postId);
    const post = await this.postRepository.getDetailPost(postId);

    if (!post) throw { msg: '존재하지 않는 게시글', code: 400 };

    return post;
  };
  //수정전 게시글 불러오기
  getPreviousPost = async (postId, userId) => {
    await PreviousPostValidation.validateAsync({ postId, userId });
    const existPostContent = await this.postRepository.getPreviousPost(postId);

    if (!existPostContent) throw { msg: '존재하지 않는 게시글', code: 400 };
    if (userId !== existPostContent.userId)
      throw { msg: '사용자정보 불일치', code: 403 };

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

    if (!post) throw { msg: '존재하지 않는 게시글', code: 400 };
    if (userId !== post.userId) throw { msg: '사용자정보 불일치', code: 403 };
    await this.postRepository.updatePost(postId, title, content, postImage);
    if (postImage) {
      const imageKey =
        post.postImage.split('/')[post.postImage.split('/').length - 1];
      await this.postS3Repository.deleteS3Image(imageKey);
    }
  };

  //게시글 삭제
  deletePost = async (postId, userId) => {
    await PreviousPostValidation.validateAsync({ postId, userId });

    const post = await this.postRepository.getPreviousPost(postId);

    if (!post) throw { msg: '존재하지 않는 게시글', code: 400 };
    if (userId !== post.userId) throw { msg: '사용자정보 불일치', code: 403 };
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
}

module.exports = PostService;
