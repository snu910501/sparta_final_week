const SearchService = require("../services/search.service");

class SearchController {
  searchService = new SearchService();

  search = async (req, res) => {
    try {
      const text = req.params.text;
      const textList = await this.searchService.search(text);

      return res.status(200).json({ data: textList })
    } catch (err) {
      console.log('SearchService Controller error', err);
      if (err.status) {
        return res.status(err.status).json({ errorMessage: err.errorMessage })
      } else {
        return res.status(500).json({ errorMessage: 'error' })
      }
    }
  }

  assignPointWord = async (req, res) => {
    try {
      const text = req.body.text;
      await this.searchService.assignPointWord(text);
      return res.status(200).json({ message: '성공' })
    } catch (err) {
      console.log('SearchController assignPointWord Error', err);
      if (err.status) {
        return res.status(err.status).json({ errorMessage: err.errorMessage })
      } else {
        return res.status(500).json({ errorMessage: 'error' })
      }

    }
  }
}

module.exports = SearchController;