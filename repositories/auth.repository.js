class AuthRepository {
  constructor(UsersModel) {
    this.usersModel = UsersModel;
  }

  createUser = async ({ snsId, nickname, email, profileImg }) => {
    const newUser = await this.usersModel.create({
      snsId,
      nickname,
      email,
      profileImg,
    });
    return newUser;
  };

  findByUser = async (email) => {
    const userSnsId = await this.usersModel.findOne({ where: { email } });
    return userSnsId;
  };
}

module.exports = AuthRepository;
