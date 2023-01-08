const PostService = require('../services/posts.service');

class PostController {
  constructor() {
    this.postService = new PostService();
  }

  getLocationPosts = async (req, res, next) => {
    try {
      const { postLocation } = req.query;
      const posts = await this.postService.getLocationPosts(postLocation);
      res.status(200).json({ posts });
    } catch (err) {
      if (err.isJoi === true)
        return res.status(400).json({ errorMsg: '유효성 검사 에러' });
      res
        .status(err.code || 500)
        .json({ errorMsg: err.msg || '알수없는 에러' });
    }
  };

  createPost = async (req, res, next) => {
    try {
      const userId = res.locals;
      const { postLocation } = req.query;
      const { title, content } = req.body;
      if (req.file) {
        const postImage = req.file.location;
        await this.postService.createPost(
          title,
          content,
          postLocation,
          userId,
          postImage,
        );
      } else
        await this.postService.createPost(title, content, postLocation, userId);
      res.status(200).json({ msg: '작성 성공' });
    } catch (err) {
      await this.postService.deleteS3Image(req.file.key);
      if (err.isJoi === true)
        return res.status(400).json({ errorMsg: '유효성 검사 에러' });
      res
        .status(err.code || 500)
        .json({ errorMsg: err.msg || '알수없는 에러' });
    }
  };

  getDetailPost = async (req, res, next) => {
    try {
      const postId = req.params.postid;
      const post = await this.postService.getDetailPost(postId);
      res.status(200).json({ post });
    } catch (err) {
      if (err.isJoi === true)
        return res.status(400).json({ errorMsg: '유효성 검사 에러' });
      res
        .status(err.code || 500)
        .json({ errorMsg: err.msg || '알수없는 에러' });
    }
  };

  getPreviousPost = async (req, res, next) => {
    try {
      const userId = res.locals;
      const postId = req.params.postid;
      const post = await this.postService.getPreviousPost(postId, userId);
      res.status(200).json({ post });
    } catch (err) {
      if (err.isJoi === true)
        return res.status(400).json({ errorMsg: '유효성 검사 에러' });
      res
        .status(err.code || 500)
        .json({ errorMsg: err.msg || '알수없는 에러' });
    }
  };

  updatePost = async (req, res, next) => {
    try {
      const userId = res.locals;
      const postId = req.params.postid;
      const { title, content } = req.body;
      if (req.file) {
        const postImage = req.file.location;
        await this.postService.updatePost(
          postId,
          title,
          content,
          userId,
          postImage,
        );
      } else await this.postService.updatePost(postId, title, content, userId);
      res.status(200).json({ msg: '수정 완료' });
    } catch (err) {
      await this.postService.deleteS3Image(req.file.key);
      if (err.isJoi === true)
        return res.status(400).json({ errorMsg: '유효성 검사 에러' });
      res
        .status(err.code || 500)
        .json({ errorMsg: err.msg || '알수없는 에러' });
    }
  };

  deletePost = async (req, res, next) => {
    try {
      const userId = res.locals;
      const postId = req.params.postid;
      await this.postService.deletePost(postId, userId);
      res.status(200).json({ msg: '삭제 완료' });
    } catch (err) {
      if (err.isJoi === true)
        return res.status(400).json({ errorMsg: '유효성 검사 에러' });
      res
        .status(err.code || 500)
        .json({ errorMsg: err.msg || '알수없는 에러' });
    }
  };
}

module.exports = PostController;
