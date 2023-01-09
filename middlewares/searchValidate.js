module.exports = searchValidate = async (req, res, next) => {
  // 서버부하를 막기 위해 음절이 들어 왔을 때만 DB에 요청을 보내기위해 유효성 검사를 실시
  // params 와 body를 나눈 이유는 검색어 자동 완성 기능은 params로 검색어를 받고
  // 검색어 점수 부여는 body로 완성된 검색어를 받기 때문
  try {
    let text = ''
    if (req.params.text) {
      text = req.params.text;
    } else if (req.body.text) {
      text = req.body.text;
    }

    // 유니코드에서 음절 '가'의 시작이 16진수로 AC00임
    const hangeulStart = 'AC00';
    const hangeulEnd = 'D7A3';

    if (text.length <= 0 || text.length >= 100) {
      const error = new Error(405, 'text 형식이 올바르지 않네요.');
      throw error;
    }

    for (let i = 0; i < text.length; i++) {
      if (text.charCodeAt(i) < parseInt(hangeulStart, 16) || text.charCodeAt(i) > parseInt(hangeulEnd, 16)) {
        return res.status(204).json({})
      }
    }
    next();
  } catch (err) {
    console.log('searchValidate Error ', err);
    return res.status(405).json({ data: err });
  }
}