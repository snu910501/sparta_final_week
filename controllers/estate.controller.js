const EstateService = require('../serveices/estate.service');

class EstateController {
  estateService = new EstateService();

  createEstate = async (req, res) => {

  }
}

module.exports = EstateController