const { Word } = require('../models');
const SearchRepository = require('../repositories/search.repository');

class SearchService {
  searchRepository = new SearchRepository();

  search = async (text) => {
    try {
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