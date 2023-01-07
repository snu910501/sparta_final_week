const { S3 } = require('@aws-sdk/client-s3');

const s3 = new S3({
  region: 'ap-northeast-2',
  credentials: {
    accessKeyId: process.env.KTH_ACCESKEYID,
    secretAccessKey: process.env.KTH_SECRETKEYID,
  },
});

module.exports = s3;
