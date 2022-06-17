const ApiError = require("../error/ApiError");
const { Country, City, Sight, Photo, Rating } = require("../models/models");
function runAsyncWrapper(callback) {
  return function(req, res, next) {
    callback(req, res, next).catch(next);
  };
}
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
        { model: City, as: "city" },
        { model: Photo, as: "photo" },
        { model: Rating, as: "rating" }
      ]
    });

    return res.json(
      country.map(el => {
        return {
          id: el.id,
          name: el.name,
          lat: el.lat,
          lng: el.lng,
          photo: el.photo?.[0] ?? "",
          city: el.city,
          rating: el.rating
        };
      })
    );
  }
  async delete(req, res, next) {
    return "";
  }
  async put(req, res, next) {
    return "";
  }
  async getOne(req, res, next) {
    let { id } = req.params;
    const country = await Country.findOne({
      where: { id },
      include: [
        { model: City, as: "city" },
        { model: Photo, as: "photo" },
        { model: Rating, as: "rating" }
      ]
    });
    if(!country){
      return next(ApiError.internal("Запрашиваемый ресурс не найден"));
    }
    return res.json(country);
  }
}
module.exports = new CountryController();
