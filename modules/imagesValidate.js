const Error = require('../modules/error');

module.exports = imagesValidate = async (images) => {
  for (let i = 0; i < images.length; i++) {
    const pattern = /[\{\}\/?,;:|*~`!^\+<>@\#$%&\\\=\'\"]/gi;
    let fileName = images[i].originalname;
    let fileDot = fileName.lastIndexOf('.');
    let fileType = fileName.substring(fileDot + 1, fileName.length).toLowerCase();

    console.log('zz', fileName, fileDot, fileType);

    if (pattern.test(fileName)) {
      const error = new Error(405, '파일명에 특수문자가 포함되어 있습니다.')
      throw error
    }

    if (fileType == 'png' || fileType == 'jpg' || fileType == 'jpeg') {
      images[i].originalname = `${Math.random().toString(30).substring(2, 11)}.${fileType}`;

    } else {
      const error = new Error(405, '확장자명은 png, jpg, jpeg만 가능합니다.')
      throw error
    }
  };

  return;
}