const sequelize = require('sequelize');
const Op = sequelize.Op;
const Word = require("../models/word");

class SearchRepository {

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

  search = async (text) => {
    try {
      const textList = await Word.findAll({
        where: {
          word: { [Op.like]: text + '%' }
        }
      })
      textList.sort(function (a, b) {
        return b.dataValues.score - a.dataValues.score
      })
      return textList.map((w) => w.word);
    } catch (err) {
      console.log('SearchRepository search Error', err);
      throw err;
    }
  };

  createWord = async (text) => {
    try {
      return await Word.create({ word: text })

    } catch (err) {
      console.log('SearchRepository createWord Error', err);
      throw err;
    }
  }

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