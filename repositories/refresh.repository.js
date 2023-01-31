class RefreshRepository {
  constructor(UsersModel, RefreshsModel) {
    this.usersModel = UsersModel;
    this.refreshsModel = RefreshsModel;
  }

  findByUser = async (userId) => {
    const isUser = await this.usersModel.findOne({ where: { userId } });
    return isUser;
  };

  findByUserKey = async (userId) => {
    const userKey = await this.refreshsModel.findOne({ where: { userId } });
    return userKey;
  };

  createRefresh = async (userId, refreshToken) => {
    await this.refreshsModel.create({
      userId,
      refreshToken,
    });
  };

  updateRefreshToken = async (refreshId, userId, refreshToken) => {
    const updateRefreshToken = await this.refreshsModel.update(
      { userId, refreshToken },
      { where: { refreshId } },
    );
    return updateRefreshToken;
  };

  deleteRefresh = async (userId) => {
    const deleteRefreshToken = await this.refreshsModel.destroy({
      where: { userId },
    });
    return deleteRefreshToken;
  };
}

module.exports = RefreshRepository;
