module.exports = searchValidate = async (req, res, next) => {
  try {
    let text = ''
    if (req.params.text) {
      text = req.params.text;
    } else if (req.body.text) {
      text = req.body.text;
    }

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