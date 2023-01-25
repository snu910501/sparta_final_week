const { S3 } = require("aws-sdk");
const fs = require("fs");
require("dotenv").config();

module.exports = uploadImageToS3 = async (images) => {
  let url = [];
  const s3 = new S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: "ap-northeast-2",
  });

  const promiseList = images.map((file) => {
    const fileStream = fs.createReadStream(file.path);
    // buffer, stream

    return s3.upload({
      Bucket: 'sparta-final-week',
      // 파일명
      Key: `upload/${file.originalname}`,
      Body: fileStream,
    })
      .promise();
  });

  const result = await Promise.all(promiseList);
  result.map(v => {
    url.push({ location: v.Location, fileName: v.key })
  });

  return url;
};
