const User = require('../models/user');

class AuthRepository {
  createUser = async (snsId, nickname, email) => {
    try {
      console.log('hihihi', snsId, nickname, email);
      const user = await User.create({ snsId, nickname, email })
      return user;
    } catch (err) {
      console.log('AuthRepository createUser Error', err);
      throw err;
    }
  }

  findUser = async (email) => {
    try {
      const userExist = await User.findOne({
        where: {
          email: email,
        }
      })
      return userExist;

    } catch (err) {
      console.log('AuthRepository findUser error', error);
      throw err;
    }
  }
}

module.exports = AuthRepository;