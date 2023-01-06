const { Router } = require('express');
const PostController = require('../controllers/posts.controller');

const multerPostImage = require('../middlewares/multer.postImage');
const postRouter = Router();
const postController = new PostController();

postRouter.get('', postController.getLocationPosts);
postRouter.post(
  '',
  multerPostImage.single('postImage'),
  postController.createPost,
);
postRouter.get('/:postId', postController.getDetailPost);
postRouter.get('/update/:postId', postController.getPreviousPost);
postRouter.patch(
  '/:postId',
  multerPostImage.single('postImage'),
  postController.updatePost,
);
postRouter.delete('/:postId', postController.deletePost);

module.exports = postRouter;
