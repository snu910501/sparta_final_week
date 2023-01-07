const { Router } = require('express');
const PostController = require('../controllers/posts.controller');

const multerPostImage = require('../middlewares/multer.postImage');
const postRouter = Router();
const postController = new PostController();
const { isLoggedIn } = require('../middlewares/auth');

postRouter.get('', postController.getLocationPosts);
postRouter.post(
  '',
  isLoggedIn,
  multerPostImage.single('postImage'),
  postController.createPost,
);
postRouter.get('/:postid', postController.getDetailPost);
postRouter.get('/update/:postid', isLoggedIn, postController.getPreviousPost);
postRouter.patch(
  '/:postid',
  isLoggedIn,
  multerPostImage.single('postImage'),
  postController.updatePost,
);
postRouter.delete('/:postid', isLoggedIn, postController.deletePost);

module.exports = postRouter;
