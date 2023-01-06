const SearchRepository = require('../repositories/search.repository');
const Error = require("../modules/error");

class SearchService {
  searchRepository = new SearchRepository();

  search = async (text) => {
    try {
      if (text.length <= 0 || text.length >= 100) {
        const error = new Error(405, 'text 형식이 올바르지 않네요.');
        throw error;
      }

      const textList = await this.searchRepository.search(text);
      return textList;
    } catch (err) {
      console.log('SearchService search Error', err);
      throw err;
    }

  }
}

module.exports = SearchService;