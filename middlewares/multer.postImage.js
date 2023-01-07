const multer = require('multer');
const multerS3 = require('multer-s3');
const shortId = require('shortid');
const s3 = require('../config/aws.post.s3');

const multerPostImage = multer({
  storage: multerS3({
    s3,
    bucket: process.env.KTH_S3_BUCKET_NAME,
    acl: 'public-read',
    key(req, file, callback) {
      const imageType = file.mimetype.split('/')[1];
      callback(
        null,
        `final-project/${Date.now()}_${shortId.generate()}.${imageType}`,
      );
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 },
});

module.exports = multerPostImage;
