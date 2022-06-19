const ApiError = require("../error/ApiError");
const { Error } = require("../models/models");

class ErrorController {
  async createOne(req, res, next) {
    const { name, description, email } = req.body;
    if (!name || !email) {
      return next(ApiError.badRequest("Не заполнены обязательные поля"));
    }
    const error = await Error.create({
      name,
      description,
      email,
      verified: false
    });
    if (!error) {
      return next(ApiError.internal("Возникла непредвиденная ошибка"));
    }
    return res.json(error);
  }

  async getAll(req, res, next) {
    const error = await Error.findAll();

    return res.json(error);
  }
  async delete(req, res, next) {
    try {
      const { id } = req.params;
      await Error.destroy({
        where: { id }
      });
      return res.status(200).json({
        message: "Данные удалены."
      });
    } catch (e) {
      return next(ApiError.internal("Возникла непредвиденная ошибка"));
    }
  }
  async put(req, res, next) {
    const { id } = req.params;
    const { name, description, email, verified } = req.body;
    if (!id || !name || !email || !verified) {
      return next(ApiError.badRequest("Не заполнены обязательные поля"));
    }
    const error = await Error.update(
      { id, name, description, email, verified },
      {
        where: { id }
      }
    );
    if (!error) {
      return next(ApiError.internal("Возникла непредвиденная ошибка"));
    }
    return res.json(error);
  }
  async getOne(req, res, next) {
    let { id } = req.params;
    const error = await Error.findOne({
      where: { id }
    });
    if (!error) {
      return next(ApiError.internal("Запрашиваемый ресурс не найден"));
    }
    return res.json(error);
  }
}
module.exports = new ErrorController();
