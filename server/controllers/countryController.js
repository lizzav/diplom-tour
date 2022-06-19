const ApiError = require("../error/ApiError");
const { Country, City, Sight, Photo, Rating } = require("../models/models");

class CountryController {
  async createOne(req, res, next) {
    const { name, description, lat, lng } = req.body;
    if (!name || !lat || !lng) {
      return next(ApiError.badRequest("Не заполнены обязательные поля"));
    }
    const country = await Country.create({ name, description, lat, lng });
    if (!country) {
      return next(ApiError.internal("Возникла непредвиденная ошибка"));
    }
    return res.json(country);
  }
  //TODO пересчет рейтинга
  async getAll(req, res, next) {
    const country = await Country.findAll({
      include: [
        {
          model: City,
          as: "city",
          include: [
            {
              model: Sight,
              as: "sight",
              include: [
                { model: Rating, as: "rating" },
                { model: Photo, as: "photo" }
              ]
            }
          ]
        }
      ]
    });

    return res.json(country);
  }
  async delete(req, res, next) {
    try {
      const { id } = req.params;
      await Country.destroy({
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
    const { name, description, lat, lng } = req.body;
    if (!id || !name || !lat || !lng) {
      return next(ApiError.badRequest("Не заполнены обязательные поля"));
    }
    const country = await Country.update(
      { id, name, description, lat, lng },
      {
        where: { id }
      }
    );
    if (!country) {
      return next(ApiError.internal("Возникла непредвиденная ошибка"));
    }
    return res.json(country);
  }
  async getOne(req, res, next) {
    let { id } = req.params;
    const country = await Country.findOne({
      where: { id },
      include: [
        {
          model: City,
          as: "city",
          include: [
            {
              model: Sight,
              as: "sight",
              include: [
                { model: Rating, as: "rating" },
                { model: Photo, as: "photo" }
              ]
            }
          ]
        }
      ]
    });
    if (!country) {
      return next(ApiError.internal("Запрашиваемый ресурс не найден"));
    }
    return res.json(country);
  }
}
module.exports = new CountryController();
