class PostsS3Repository {
  constructor(s3) {
    this.s3 = s3;
  }

  deleteS3Image = (imageKey) => {
    return this.s3.deleteObject({
      Bucket: process.env.KTH_S3_BUCKET_NAME,
      Key: 'final-project/'.concat(imageKey),
    });
  };
}

module.exports = PostsS3Repository;
