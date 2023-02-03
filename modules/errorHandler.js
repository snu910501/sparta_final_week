const errorHandler = (err, req, res, next) => {
  console.error(err);
  if (err.isBoom)
    res.status(err.output.statusCode).json({ errorMsg: err.message });
  else if (err.isJoi)
    res
      .status(400)
      .json({ errorMsg: '유효성 검사 오류', originalMsg: err.message });
  else res.status(500).json({ errorMsg: '알 수 없는 오류' });
};

module.exports = errorHandler;
