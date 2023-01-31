class AuthRepository {
  constructor(UsersModel) {
    this.usersModel = UsersModel;
  }

  createUser = async (snsId, email) => {
    const newUser = await this.usersModel.create({
      snsId,
      email,
    });
    return newUser;
  };

  findByUser = async (snsId) => {
    const userSnsId = await this.usersModel.findOne({ where: { snsId } });
    return userSnsId;
  };
}

module.exports = AuthRepository;
