const sequelize = require('sequelize');
const Op = sequelize.Op;
const Word = require("../models/word");
const e = require('express');

class SearchRepository {

  search = async (text) => {
    try {
      console.log('textzz', text)
      const textList = await Word.findAll({
        where: {
          word: { [Op.like]: text + '%' }
        }
      })
      // console.log('textListzz', textList.map((w) => w.word));
      return textList.map((w) => w.word);
    } catch (err) {
      console.log('SearchRepository search Error', err);
      throw err;
    }
  }
}

module.exports = SearchRepository