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
const { postSanitizer } = require('../middlewares/sanitizer');

//게시글 작성
postRouter.post(
  '',
  isLoggedIn,
  postCUDApiLimiter,
  multerPostImage.single('postImage'),
  postSanitizer,
  postController.createPost,
);

//지역 게시글 댓글 순 조회
postRouter.get('', getApiLimiter, postController.getLocationPosts);

//지역 게시글 최신 순 조회
postRouter.get('/recent', getApiLimiter, postController.getRecentPosts);

//내가 작성한 게시글 조회
postRouter.get('/me', isLoggedIn, getApiLimiter, postController.getMyPost);

//검색한 게시글 (제목, 내용, 작성자) 조회
postRouter.get('/search', postController.getSearchedPost);

//특정 게시글 상세 조회
postRouter.get('/:postid', getApiLimiter, postController.getDetailPost);

//이전 게시글 상세 조회
postRouter.get(
  '/:postid/previous',
  getApiLimiter,
  postController.getPreviousPost,
);

//다음 게시글 상세 조회
postRouter.get('/:postid/next', getApiLimiter, postController.getNextPost);

//수정전 게시글 내용 조회
postRouter.get(
  '/update/:postid',
  isLoggedIn,
  getApiLimiter,
  postController.getWrotePost,
);

//게시글 수정
postRouter.patch(
  '/:postid',
  isLoggedIn,
  postCUDApiLimiter,
  multerPostImage.single('postImage'),
  postSanitizer,
  postController.updatePost,
);

//게시글 삭제
postRouter.delete(
  '/:postid',
  isLoggedIn,
  postCUDApiLimiter,
  postController.deletePost,
);

module.exports = postRouter;
