module.exports = searchValidate = async (text) => {
  let checkString = /^[a-zA-Zㄱ-힣0-9-_.]{1,20}$/

  if (!checkString.test(text)) {
    const error = new Error(405, 'search에는 특수문자가 들어올 수 없습니다.');
    throw error;
  }
}