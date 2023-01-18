const { Router } = require('express');
const PostController = require('../controllers/posts.controller');

const multerPostImage = require('../middlewares/multer.postImage');
const postRouter = Router();
const postController = new PostController();
const { isLoggedIn } = require('../middlewares/auth');
const {
  postCUDApiLimiter,
  getApiLimiter,
} = require('../middlewares/apilimitrater');

postRouter.post(
  '',
  isLoggedIn,
  postCUDApiLimiter,
  multerPostImage.single('postImage'),
  postController.createPost,
);
postRouter.get('', getApiLimiter, postController.getLocationPosts);
postRouter.get('/me', isLoggedIn, getApiLimiter, postController.getMyPost);
postRouter.get('/:postid', getApiLimiter, postController.getDetailPost);
postRouter.get(
  '/update/:postid',
  isLoggedIn,
  getApiLimiter,
  postController.getPreviousPost,
);
postRouter.patch(
  '/:postid',
  isLoggedIn,
  postCUDApiLimiter,
  multerPostImage.single('postImage'),
  postController.updatePost,
);
postRouter.delete(
  '/:postid',
  isLoggedIn,
  postCUDApiLimiter,
  postController.deletePost,
);

module.exports = postRouter;
