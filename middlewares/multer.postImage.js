const multer = require('multer');
const multerS3 = require('multer-s3');
const { nanoid } = require('nanoid');
const s3 = require('../config/aws.post.s3');
const { badRequest } = require('@hapi/boom');

//이미지 형식만 걸러내는 파일필터 함수 선언
const fileFilter = (req, file, callback) => {
  const fileTypes = file.mimetype.split('/')[0];
  if (fileTypes === 'image') callback(null, true);
  else callback(badRequest('이미지 형식 아님'), false);
};

const multerPostImage = multer({
  storage: multerS3({
    s3,
    bucket: process.env.KTH_S3_BUCKET_NAME,
    acl: 'public-read',
    key(req, file, callback) {
      const imageType = file.mimetype.split('/')[1];
      callback(null, `final-project/${nanoid()}.${imageType}`);
    },
  }),
  // 파일 최대크기 100MB, 파일 전송 개수제한 1개, 데이터전송시 파일을 제외한 필드 개수 9개
  limits: { fileSize: 100 * 1024 * 1024, files: 1, fields: 9 },
  fileFilter: fileFilter,
});

module.exports = multerPostImage;
