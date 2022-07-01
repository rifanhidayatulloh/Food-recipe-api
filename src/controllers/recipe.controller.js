const recipeModel = require('../models/recipe.model');
const { sucses, failed } = require('../helpers/response');
const deleteFile = require('../helpers/delete');

const recipeController = {
  list: async (req, res) => {
    try {
      let { search, page, limit } = req.query;
      page = Number(page);
      limit = Number(limit);
      const getSearch = !search ? '' : search;
      const getPage = !page ? 1 : page;
      const getLimit = !limit ? 100 : limit;
      const offset = getPage * getLimit - getLimit;
      const allData = await recipeModel.getCountRecipe();
      const totalData = Number(allData.rows[0].total);
      const pagination = {
        currentPage: getPage,
        currentLimit: getLimit,
        totalPage: Math.ceil(totalData / getLimit),
      };
      const result = await recipeModel.select(getSearch, getLimit, offset);
      // console.log(result);
      if (result.rows.length === 0) {
        failed(res, null, 'Failed', 'Data not found');
        return;
      }
      sucses(res, result.rows, 'Succsess', 'Success get  recipe', pagination);
    } catch (err) {
      failed(res, err.message, 'Failed', 'Failed to get recipe');
    }
  },
  myRecipe: async (req, res) => {
    try {
      const userId = req.APP_DATA.tokenDecoded.user_id;
      let { search, page, limit } = req.query;
      page = Number(page);
      limit = Number(limit);
      const getSearch = !search ? '' : search;
      const getPage = !page ? 1 : page;
      const getLimit = !limit ? 3 : limit;
      const offset = getPage * getLimit - getLimit;
      const allData = await recipeModel.getCountRecipe();
      const totalData = Number(allData.rows[0].total);
      const pagination = {
        currentPage: getPage,
        currentLimit: getLimit,
        totalPage: Math.ceil(totalData / getLimit),
      };
      const result = await recipeModel.myRecipe(
        getSearch,
        getLimit,
        offset,
        userId
      );
      if (result.rows.length === 0) {
        failed(res, null, 'Failed', 'Data not found');
        return;
      }
      sucses(res, result.rows, 'Succsess', 'Success get  recipe', pagination);
    } catch (err) {
      failed(res, err.message, 'Failed', 'Failed to get recipe');
    }
  },
  recipePublic: async (req, res) => {
    try {
      let { search, page, limit } = req.query;
      page = Number(page);
      limit = Number(limit);
      const getSearch = !search ? '' : search;
      const getPage = !page ? 1 : page;
      const getLimit = !limit ? 6 : limit;
      const offset = getPage * getLimit - getLimit;
      const allData = await recipeModel.getCountPublic();
      const totalData = Number(allData.rows[0].total);
      const pagination = {
        currentPage: getPage,
        currentLimit: getLimit,
        totalPage: Math.ceil(totalData / getLimit),
      };
      const result = await recipeModel.selectRecipePublic(
        getSearch,
        getLimit,
        offset
      );
      if (result.rows.length === 0) {
        failed(res, null, 'Failed', 'Data not found');
        return;
      }
      sucses(
        res,
        result.rows,
        'Success',
        'Success get recipe by user',
        pagination
      );
    } catch (err) {
      failed(res, err.message, 'Failed', 'Failed to get recipe by user');
    }
  },
  recipeId: async (req, res) => {
    try {
      const recipeId = req.params.recipeId;
      const result = await recipeModel.selectRecipeId(recipeId);
      // console.log(result.rows);
      sucses(res, result.rows[0], 'Success', 'Success get recipe');
    } catch (err) {
      failed(res, err.message, 'Failed', 'Failed to get recipe');
    }
  },
  newRecipe: async (req, res) => {
    try {
      const result = await recipeModel.selectNewRecipe();
      sucses(res, result.rows, 'Success', 'Success get latests recipe');
    } catch (err) {
      failed(res, err.message, 'Failed', 'Failed to get recipe');
    }
  },
  insert: async (req, res) => {
    try {
      const userId = req.APP_DATA.tokenDecoded.user_id;
      const { title, ingredients, video } = req.body;
      const filePhoto = req.file.filename;
      if (!title || !ingredients || !video) {
        failed(res, null, 'Failed', 'All data must be filled');
        return;
      }
      const result = await recipeModel.append(
        filePhoto,
        title,
        ingredients,
        video,
        userId
      );
      sucses(res, result, 'Success', 'Success insert recipe');
    } catch (err) {
      failed(res, err.message, 'Failed', 'Failed to insert recipe');
    }
  },
  update: async (req, res) => {
    try {
      const userId = req.APP_DATA.tokenDecoded.user_id;
      let recipeId = req.params.recipeId;
      const { title, ingredients, video } = req.body;
      const filePhoto = req.file.filename;
      if (!video || !title || !ingredients) {
        failed(res, null, 'Failed', 'All data must be filled');
        return;
      }
      const check = await recipeModel.check(recipeId);
      const photo = check.rows[0].photo;
      const result = await recipeModel.update(
        userId,
        filePhoto,
        title,
        ingredients,
        video,
        recipeId
      );
      sucses(res, result, 'Success', 'Success update recipe');
      deleteFile(`./public/${photo}`);
    } catch (err) {
      failed(res, err.message, 'Failed', 'Failed update recipe');
    }
  },
  publicView: async (req, res) => {
    try {
      let recipeId = req.params.recipeId;
      let { publicView } = req.body;
      recipeId = Number(recipeId);
      publicView = Number(publicView);
      const result = await recipeModel.publicView(recipeId, publicView);
      sucses(res, result, 'Success', 'Success update publick view');
    } catch (err) {
      failed(res, err.message, 'Failed', 'Failed update publick view');
    }
  },
  deleted: async (req, res) => {
    try {
      const recipeId = req.params.recipeId;
      const userId = req.APP_DATA.tokenDecoded.user_id;
      const check = await recipeModel.check(recipeId);
      const photo = check.rows[0].photo;
      const result = await recipeModel.deleted(userId, recipeId);
      sucses(res, result, 'Success', 'Success delete recipe');
      deleteFile(`./public/${photo}`);
    } catch (err) {
      failed(res, err.message, 'Failed', 'Failed delete recipe');
    }
  },
};

module.exports = recipeController;
