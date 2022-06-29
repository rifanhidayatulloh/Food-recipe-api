const commentModel = require("../models/comment.model");
const { sucses, failed } = require("../helpers/response");

const commentController = {
  list: async (req, res) => {
    try {
      let { sortField, sortType, page, limit } = req.query;
      page = Number(page);
      limit = Number(limit);
      const sortByField = !sortField ? "comment_id" : sortField;
      const sortByType = !sortType ? "ASC" : sortType;
      const getPage = !page ? 1 : page;
      const getLimit = !limit ? 100 : limit;
      const offset = getPage * getLimit - getLimit;
      const allData = await commentModel.getCountComment();
      const totalData = Number(allData.rows[0].total);
      const pagination = {
        currentPage: getPage,
        currentLimit: getLimit,
        totalPage: Math.ceil(totalData / getLimit),
      };
      const result = await commentModel.selctAll(
        sortByField,
        sortByType,
        getLimit,
        offset
      );
      sucses(res, result.rows, "Success", "Get all comment", pagination);
    } catch (err) {
      failed(res, err.message, "Failed", "Get all failed");
    }
  },
  comments: async (req, res) => {
    try {
      const { search } = req.query;
      const getSearch = !search ? "" : search;
      const result = await commentModel.selectCommentRecipe(getSearch);
      if (result.rows.length === 0) {
        failed(res, null, "Failed", "Data not found");
        return;
      }
      sucses(res, result.rows, "Success", "Success get comment by recipe");
    } catch (err) {
      failed(res, err.message, "Failed", "Get comment by recipe failed");
    }
  },
  insert: async (req, res) => {
    try {
      const userId = req.APP_DATA.tokenDecoded.user_id;
      const { recipeId, commentText } = req.body;
      if (!recipeId || !commentText) {
        failed(res, null, "Failed", "All data must be filled");
        return;
      }
      const result = await commentModel.append(recipeId, commentText, userId);
      sucses(res, result, "Success", "Success insert comment");
    } catch (err) {
      failed(res, err.message, "Failed", "Failed to insert comment");
    }
  },
  update: async (req, res) => {
    try {
      const userId = req.APP_DATA.tokenDecoded.user_id;
      const commentId = req.params.commentId;
      const { recipeId, commentText } = req.body;
      if (!commentId || !recipeId || !commentText) {
        failed(res, null, "Failed", "All data must be filled");
        return;
      }
      const result = await commentModel.update(
        commentId,
        recipeId,
        commentText,
        userId
      );
      sucses(res, result, "Success", "Success update comment");
    } catch (err) {
      failed(res, err.message, "Failed", "Failed update comment");
    }
  },
  updatePublic: async (req, res) => {
    try {
      const { commentId, publicView } = req.body;
      const result = await commentModel.updatePublic(commentId, publicView);
      sucses(res, result, "Success", "Success update comment");
    } catch (err) {
      failed(res, err.message, "Failed", "Failed update comment");
    }
  },
  deleted: async (req, res) => {
    try {
      const userId = req.APP_DATA.tokenDecoded.user_id;
      const commentId = req.params.commentId;
      const result = await commentModel.deleted(commentId, userId);
      sucses(res, result, "Success", "Success delete comment");
    } catch (err) {
      failed(res, err.message, "Failed", "Failed delete comment");
    }
  },
};

module.exports = commentController;
