class AuthRepository {
  constructor(UsersModel, RefreshsModel) {
    this.usersModel = UsersModel;
    this.refreshsModel = RefreshsModel;
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

  createRefreshToken = async ({ userId, refreshToken }) => {
    const newRefreshToken = await this.refreshsModel.create({
      userId,
      refreshToken,
    });
    return newRefreshToken;
  };

  updateToken = async ({ userId, refreshToken }) => {
    const updateRefreshToken = await this.refreshsModel.update(
      { refreshToken },
      { where: { userId } },
    );
    return updateRefreshToken;
  };
}

module.exports = AuthRepository;
