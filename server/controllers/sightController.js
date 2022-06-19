const ApiError = require("../error/ApiError");
const { City, Sight, Photo, Rating } = require("../models/models");
const uuid = require("uuid");
const path = require("path");

class SightController {
  async createOne(req, res, next) {
    const { name, description, lat, lng, cityId, address } = req.body;
    if (!name || !lat || !lng || !cityId || !address) {
      return next(ApiError.badRequest("Не заполнены обязательные поля"));
    }
    const city = await City.findOne({
      where: { id: cityId }
    });
    if (!city) {
      return next(ApiError.badRequest("Указанного города не существует"));
    }
    const sight = await Sight.create({
      name,
      description,
      lat,
      lng,
      cityId,
      address
    });
    if (!sight) {
      return next(ApiError.internal("Возникла непредвиденная ошибка"));
    }
    return res.json(sight);
  }

  async getAll(req, res, next) {
    const sight = await Sight.findAll({
      include: [
        { model: Photo, as: "photo" },
        { model: Rating, as: "rating" }
      ]
    });

    return res.json(sight);
  }
  async delete(req, res, next) {
    try {
      const { id } = req.params;
      await Sight.destroy({
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
    const { name, description, lat, lng, cityId, address } = req.body;
    if (!id||!name || !lat || !lng||!cityId||!address) {
      return next(ApiError.badRequest("Не заполнены обязательные поля"));
    }
    const sight = await Sight.update({ id, name, description, lat, lng,cityId,address},{
      where: { id }
    });
    if (!sight) {
      return next(ApiError.internal("Возникла непредвиденная ошибка"));
    }
    return res.json(sight);
  }
  async getOne(req, res, next) {
    let { id } = req.params;
    const sight = await Sight.findOne({
      where: { id },
      include: [
        { model: Photo, as: "photo" },
        { model: Rating, as: "rating" }
      ]
    });
    if (!sight) {
      return next(ApiError.internal("Запрашиваемый ресурс не найден"));
    }
    return res.json(sight);
  }
  async getCity(req, res, next) {
    let { id } = req.params;
    const sight = await Sight.findOne({
      where: { cityId:id },
      include: [
        { model: Photo, as: "photo" },
        { model: Rating, as: "rating" }
      ]
    });
    if (!sight) {
      return next(ApiError.internal("Запрашиваемый ресурс не найден"));
    }
    return res.json(sight);
  }

  async sendPhoto(req, res, next) {
    let { id } = req.params;
    const sight = await Sight.findOne({
      where: { id },
    });
    if (!sight) {
      return next(ApiError.internal("Запрашиваемый ресурс не найден"));
    }
    const { img } = req?.files;
    if (!img) {
      return next(ApiError.badRequest("Не заполнены обязательные поля"));
    }
    let fileName = uuid.v4() + ".jpg";
    img.mv(path.resolve(__dirname, "..", "static", fileName));
    const photo = await Photo.create({
      name:fileName,
      sightId:id
    });
    if (!photo) {
      return next(ApiError.internal("Возникла непредвиденная ошибка"));
    }
    return res.json(photo);
  }
  async updatePhoto(req, res, next) {
    let { id } = req.params;
    let { sightId } = req.body;
    const { img } = req?.files;
    if (!img ||!sightId) {
      return next(ApiError.badRequest("Не заполнены обязательные поля"));
    }
    const sight = await Sight.findOne({
      where: { id:sightId },
    });
    if (!sight) {
      return next(ApiError.internal("Запрашиваемый ресурс не найден"));
    }
    const oldPhoto = await Photo.findOne({
      where: { id },
    });
    if (!oldPhoto) {
      return next(ApiError.internal("Запрашиваемый ресурс не найден"));
    }
    let fileName = uuid.v4() + ".jpg";
    img.mv(path.resolve(__dirname, "..", "static", fileName));
    const photo = await Photo.update({
      name:fileName,
      sightId
    }, {where:{id}});
    if (!photo) {
      return next(ApiError.internal("Возникла непредвиденная ошибка"));
    }
    return res.json(photo);
  }
  async deletePhoto(req, res, next) {
    let { id } = req.params;
  await Photo.destroy( {where:{id}});

    return res.status(200).json({
      message: "Данные удалены."
    });
  }
}
module.exports = new SightController();
