const {Country, City, Sight, Photo}=require("../models/models")

const ApiError = require("../error/ApiError");

class CityController {
  async createOne(req, res, next) {
    const {name,description,lat,lng,countryId}=req.body
    if (!name || !lat||!lng||!countryId) {
      return next(ApiError.badRequest("Не заполнены обязательные поля"));
    }
    const city = await City.create({ name, description, lat, lng,countryId });
    if (!city) {
      return next(ApiError.internal("Возникла непредвиденная ошибка"));
    }
    return res.json(city);
  }

  async getAll(req, res, next) {
    return ''
  }
  async delete(req, res, next) {

    return '';
  }
  async put(req, res, next) {

    return '';
  }
  async getOne(req, res, next) {

    return '';
  }
  async getCountry(req, res, next) {

    return '';
  }
}
module.exports = new CityController();
