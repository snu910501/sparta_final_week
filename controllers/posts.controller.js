const PostService = require('../services/posts.service');

class PostController {
  constructor() {
    this.postService = new PostService();
  }

  getLocationPosts = async (req, res, next) => {
    try {
      const { postLocation1, postLocation2, page, type, search } = req.query;
      const posts = await this.postService.getLocationPosts({
        postLocation1,
        postLocation2,
        page,
        type,
        search,
      });
      res.status(200).json(posts);
    } catch (err) {
      next(err);
    }
  };

  createPost = async (req, res, next) => {
    try {
      const { userId, email } = res.locals;
      const { title, content, postLocation1, postLocation2 } = req.filtered;
      if (req.file) {
        const postImage = req.file.location;
        await this.postService.createPost({
          title,
          content,
          postLocation1,
          postLocation2,
          userId,
          email,
          postImage,
        });
      } else
        await this.postService.createPost({
          title,
          content,
          postLocation1,
          postLocation2,
          userId,
          email,
        });
      res.status(200).json({ msg: '작성 성공' });
    } catch (err) {
      if (req.file) await this.postService.deleteS3Image(req.file.key);
      next(err);
    }
  };

  getDetailPost = async (req, res, next) => {
    try {
      const postId = req.params.postid;
      const post = await this.postService.getDetailPost(postId);
      res.status(200).json({ post });
    } catch (err) {
      next(err);
    }
  };

  getWrotePost = async (req, res, next) => {
    try {
      const { userId } = res.locals;
      const postId = req.params.postid;
      const post = await this.postService.getWrotePost(postId, userId);
      res.status(200).json({ post });
    } catch (err) {
      next(err);
    }
  };

  updatePost = async (req, res, next) => {
    try {
      const { userId } = res.locals;
      const postId = req.params.postid;
      const { title, content, postLocation1, postLocation2 } = req.filtered;
      if (req.file) {
        const postImage = req.file.location;
        await this.postService.updatePost({
          postId,
          title,
          content,
          postLocation1,
          postLocation2,
          userId,
          postImage,
        });
      } else
        await this.postService.updatePost({
          postId,
          title,
          content,
          postLocation1,
          postLocation2,
          userId,
        });
      res.status(200).json({ msg: '수정 완료' });
    } catch (err) {
      if (req.file) await this.postService.deleteS3Image(req.file.key);
      next(err);
    }
  };

  deletePost = async (req, res, next) => {
    try {
      const { userId } = res.locals;
      const postId = req.params.postid;
      await this.postService.deletePost(postId, userId);
      res.status(200).json({ msg: '삭제 완료' });
    } catch (err) {
      next(err);
    }
  };

  getMyPost = async (req, res, next) => {
    try {
      const { userId } = res.locals;
      const myposts = await this.postService.getMyPost(userId);
      res.status(200).json({ myposts });
    } catch (err) {
      next(err);
    }
  };
}

module.exports = PostController;
