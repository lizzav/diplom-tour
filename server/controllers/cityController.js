const { Country, City, Sight, Photo, Rating } = require("../models/models");

const prerere=(city)=>{
  const {id, name,description,lat, lng,sight}=city;
  const photo=[]
  const rating=[]
    sight.forEach(e=>{
      photo.push(...e.photo)
      rating.push(...e.rating)
    })
  return {id, name, description,lat, lng, photo,rating, sight}
}

const ApiError = require("../error/ApiError");
class CityController {
  async createOne(req, res, next) {
    const { name, description, lat, lng, countryId } = req.body;
    if (!name || !lat || !lng || !countryId) {
      return next(ApiError.badRequest("Не заполнены обязательные поля"));
    }
    const country = await Country.findOne({
      where: { id: countryId }
    });
    if (!country) {
      return next(ApiError.badRequest("Указанной страны не существует"));
    }
    const city = await City.create({ name, description, lat, lng, countryId });
    if (!city) {
      return next(ApiError.internal("Возникла непредвиденная ошибка"));
    }
    return res.json(city);
  }

  async getAll(req, res, next) {
    const city = await City.findAll({
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
    });

    return res.json(city.map(el=>prerere(el)));
  }
  async delete(req, res, next) {
    try {
      const { id } = req.params;
      await City.destroy({
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
    const { name, description, lat, lng, countryId } = req.body;
    if (!id || !name || !lat || !lng || !countryId) {
      return next(ApiError.badRequest("Не заполнены обязательные поля"));
    }
    const city = await City.update(
      { id, name, description, lat, lng, countryId },
      {
        where: { id }
      }
    );
    if (!city) {
      return next(ApiError.internal("Возникла непредвиденная ошибка"));
    }
    return res.json(city);
  }
  async getOne(req, res, next) {
    let { id } = req.params;
    const city = await City.findOne({
      where: { id },
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
    });
    if (!city) {
      return next(ApiError.internal("Запрашиваемый ресурс не найден"));
    }
    return res.json(prerere(city));
  }
  async getCountry(req, res, next) {
    let { id } = req.params;
    const city = await City.findOne({
      where: { countryId: id },
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
    });
    if (!city) {
      return next(ApiError.internal("Запрашиваемый ресурс не найден"));
    }
    return res.json(city.map(el=>prerere(el)));
  }
}
module.exports = new CityController();
