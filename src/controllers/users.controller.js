const userModel = require('../models/users.model');
const { sucses, failed } = require('../helpers/response');
const deleteFile = require('../helpers/delete');
// const redis = require("../config/redisConfig");

const userController = {
  list: async (req, res) => {
    try {
      let { sortField, sortType, page, limit } = req.query;
      page = Number(page);
      limit = Number(limit);
      const sortByField = !sortField ? 'user_id' : sortField;
      const sortByType =
        sortType === 'ASC' || sortType === 'DESC' ? sortType : 'ASC';
      const getPage = !page ? 1 : page;
      const getLimit = !limit ? 100 : limit;
      const offset = (getPage - 1) * getLimit;
      const allData = await userModel.getCountUsers();
      const totalData = Number(allData.rows[0].total);
      const pagination = {
        currentPage: getPage,
        currentLimit: getLimit,
        totalPage: Math.ceil(totalData / getLimit),
      };
      const result = await userModel.selctAll(
        sortByField,
        sortByType,
        getLimit,
        offset
      );
      sucses(res, result.rows, 'Success', 'Get all sucsess', pagination);
    } catch (err) {
      failed(res, err.message, 'Failed', 'Get all failed');
    }
  },
  detail: async (req, res) => {
    try {
      const { searchName } = req.query;
      const getUserName = !searchName ? '' : searchName;
      const result = await userModel.selectById(getUserName);
      if (result.rows.length === 0) {
        failed(res, null, 'failed', 'Data not found');
        return;
      }
      sucses(res, result.rows, 'Success', 'Success get user');
    } catch (err) {
      failed(res, err.message, 'Failed', 'Get id failed');
    }
  },
  update: async (req, res) => {
    try {
      const userId = req.APP_DATA.tokenDecoded.user_id;
      const { userName, phone } = req.body;
      if (!userName || !phone) {
        res.json({ message: 'All data must be filled' });
        return;
      }
      const check = await userModel.checkPhotoUser(userId);
      const photo = check.rows[0].photo;
      const filePhoto = req.files.image[0].filename;
      const result = await userModel.update(userId, userName, phone, filePhoto);
      sucses(res, result, 'Success', 'Update success');
      deleteFile(`./public/${photo}`);
    } catch (err) {
      failed(res, err.message, 'Failed', 'Update failed');
    }
  },
  activeNonactive: async (req, res) => {
    try {
      const userId = req.params.userId;
      const { isActive } = req.body;
      if (!userId || !isActive) {
        failed(res, null, 'Failed', 'All data must be filled');
        return;
      }
      const result = await userModel.activeNonActive(isActive, userId);
      sucses(res, result, 'Success', 'Update success');
    } catch (err) {
      failed(res, err.message, 'Failed', 'Update failed');
    }
  },
  deleteUser: async (req, res) => {
    try {
      const userId = req.APP_DATA.tokenDecoded.user_id;
      const check = await userModel.checkPhotoUser(userId);
      const photo = check.rows[0].photo;
      const result = await userModel.deleteUser(userId);
      sucses(res, result, 'Success', 'Delete success');
      deleteFile(`./public/${photo}`);
    } catch (err) {
      failed(res, err.message, 'Failed', 'Delete failed');
    }
  },
  // deleted: async (req, res) => {
  //   try {
  //     const userId = req.params.userId;
  //     const check = await userModel.checkPhotoUser(userId);
  //     const photo = check.rows[0].photo;
  //     const result = await userModel.deleted(userId);
  //     sucses(res, result, "Success", "Delete success");
  //     deleteFile(`./public/${photo}`);
  //   } catch (err) {
  //     failed(res, err.message, "Failed", "Delete failed");
  //   }
  // },
  selectUserId: async (req, res) => {
    try {
      const userId = req.APP_DATA.tokenDecoded.user_id;
      const result = await userModel.selectUserId(userId);
      sucses(res, result.rows[0], 'Success', 'get user success');
    } catch (err) {
      failed(res, err.message, 'Failed', 'get user failed');
    }
  },
};

module.exports = userController;
