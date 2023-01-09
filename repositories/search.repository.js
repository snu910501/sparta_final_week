const sequelize = require('sequelize');
const Op = sequelize.Op;
const Word = require("../models/word");

class SearchRepository {

  // 검색어DB에서 해당 검색어가 있는지 없는지 검사합니다.
  findWord = async (text) => {
    try {
      const textExist = await Word.findOne({
        where: {
          word: text
        }
      })

      return textExist;
    } catch (err) {
      console.log('SearchRepository findWord Error', err);
      throw err;
    }
  }

  // 검색어 요청을 받고 DB에서 관련 검색어를 모두 가져와 
  // Score에 따라서 우선순위를 나눕니다.
  search = async (text) => {
    try {
      const textList = await Word.findAll({
        where: {
          word: { [Op.like]: text + '%' }
        }
      })
      // score에 따라서 검색어 우선순위 정렬
      textList.sort(function (a, b) {
        return b.dataValues.score - a.dataValues.score
      })
      // 위에서 아래로 5개 짜름
      let textLists = textList.slice(0, 5);
      return textLists.map((w) => w.word);
    } catch (err) {
      console.log('SearchRepository search Error', err);
      throw err;
    }
  };

  // 검색어가 DB에 없으면 저장
  createWord = async (text) => {
    try {
      return await Word.create({ word: text })

    } catch (err) {
      console.log('SearchRepository createWord Error', err);
      throw err;
    }
  }

  // 검색어가 DB에 있을경우 score추가
  assignPointWord = async (textExist) => {
    try {
      await textExist.update({
        score: textExist.score += 1,
      })
    } catch (err) {
      console.log('SearchRepository assignPointWord Error', err);
      throw err;
    }
  }
}

module.exports = SearchRepository