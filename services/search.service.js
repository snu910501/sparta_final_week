const { Word } = require('../models');
const SearchRepository = require('../repositories/search.repository');
const searchValidate = require("../modules/searchValidate");

class SearchService {
  searchRepository = new SearchRepository();

  search = async (text) => {
    try {
      // 검색어 중 특수문자가 있으면 짤라버리는 유효성 검사
      await searchValidate(text);
      const textList = await this.searchRepository.search(text);
      return textList;
    } catch (err) {
      console.log('SearchService search Error', err);
      throw err;
    }
  };

  assignPointWord = async (text) => {
    try {
      const textExist = await this.searchRepository.findWord(text);
      if (textExist) {
        return await this.searchRepository.assignPointWord(textExist);
      } else {
        return await this.searchRepository.createWord(text);
      }

    } catch (err) {
      console.log('SearchService assignPointWord Error', err);
      throw err;
    }
  }

}

module.exports = SearchService;