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
postRouter.get('/:postid', postController.getDetailPost);
postRouter.get('/update/:postid', postController.getPreviousPost);
postRouter.patch(
  '/:postid',
  multerPostImage.single('postImage'),
  postController.updatePost,
);
postRouter.delete('/:postid', postController.deletePost);

module.exports = postRouter;
