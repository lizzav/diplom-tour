const ApiError = require("../error/ApiError");

const { Travel, TravelSight, Sight, User, Photo } = require("../models/models");
class TravelController {
  async createOne(req, res, next) {
    const { name } = req.body;
    if (!name) {
      return next(ApiError.badRequest("Не заполнены обязательные поля"));
    }
    const user = await User.findOne({ where: { id: req.user.id } });
    if (!user) {
      return next(ApiError.badRequest("Неверный пользователь"));
    }
    const travel = await Travel.create({ name, userId: req.user.id });
    if (!travel) {
      return next(ApiError.internal("Возникла непредвиденная ошибка"));
    }
    return res.json(travel);
  }

  async getAll(req, res, next) {
    const travel = await Travel.findAll({ where: { userId: req.user.id } });
    if (!travel) {
      return next(ApiError.internal("Возникла непредвиденная ошибка"));
    }
    return res.json(travel);
  }
  async delete(req, res, next) {
    const { id } = req.params;
    await Travel.destroy({ where: { id, userId: req.user.id } });
    return res.status(200).json({
      message: "Данные удалены."
    });
  }
  async put(req, res, next) {
    const { id } = req.params;

    const { name } = req.body;
    if (!name) {
      return next(ApiError.badRequest("Не заполнены обязательные поля"));
    }
    const travel = await Travel.findOne({ where: { id, userId: req.user.id } });
    if (!travel) {
      return next(ApiError.forbidden("Нет доступа"));
    }
    await Travel.update(
      { id, name, userId: req.user.id },
      { where: { id, userId: req.user.id } }
    );
    return res.status(200).json({
      message: "Данные обнавлены."
    });
  }
  async getOne(req, res, next) {
    const { id } = req.params;
    const travel = await Travel.findOne({
      where: { userId: req.user.id, id },
      include: [
        {
          model: TravelSight,
          as: "TravelSight",
          include: [
            {
              model: Sight,
              as: "sight",
              include: [{ model: Photo, as: "photo" }]
            }
          ]
        }
      ]
    });
    if (!travel) {
      return next(ApiError.forbidden("Нет доступа"));
    }
    return res.json(travel);
  }

  async putSight(req, res, next) {
    const { id } = req.params;

    const { sightId, travelId, visited } = req.body;
    if (!sightId || !travelId) {
      return next(ApiError.badRequest("Не заполнены обязательные поля"));
    }
    const travel = await Travel.findOne({
      where: { userId: req.user.id, id: travelId }
    });
    if (!travel) {
      return next(ApiError.forbidden("Нет доступа"));
    }
    const sight = await Sight.findOne({ where: { id: sightId } });
    if (!sight) {
      return next(
        ApiError.badRequest("Несущевствует указанной достопримечательности")
      );
    }
    const travelSight = await TravelSight.update(
      {
        sightId,
        visited:visited??false,
        travelId
      },
      { where: { id } }
    );
    if (!travelSight) {
      return next(ApiError.internal("Возникла непредвиденная ошибка"));
    }
    return res.json(travelSight);
  }

  async deleteSight(req, res, next) {
    const { id } = req.params;
    const travelSight = await TravelSight.findOne({ where: { id } });
    if (!travelSight) {
      ApiError.badRequest("Несущевствует указанной записи");
    }
   const  {travelId}=travelSight
    const travel = await Travel.findOne({ where: {id:travelId, userId: req.user.id } });
    if (!travelSight && !travel) {
      return next(ApiError.forbidden("Нет доступа"));
    }

    await TravelSight.destroy({ where: { id } });
    return res.status(200).json({
      message: "Данные удалены."
    });
  }

  async createSight(req, res, next) {
    const { id } = req.params;

    const { sightId } = req.body;
    if (!sightId) {
      return next(ApiError.badRequest("Не заполнены обязательные поля"));
    }
    const travel = await Travel.findOne({ where: { userId: req.user.id, id } });
    if (!travel) {
      return next(ApiError.forbidden("Нет доступа"));
    }
    const sight = await Sight.findOne({ where: { id: sightId } });
    if (!sight) {
      return next(
        ApiError.badRequest("Несущевствует указанной достопримечательности")
      );
    }
    const travelSightOld = await TravelSight.findOne({
      where: { travelId: id, sightId }
    });
    if (travelSightOld) {
      return next(
        ApiError.badRequest("Данная достопримечательность уже есть в списке")
      );
    }
    const travelSight = await TravelSight.create({
      sightId,
      visited: false,
      travelId: id
    });
    if (!travelSight) {
      return next(ApiError.internal("Возникла непредвиденная ошибка"));
    }
    return res.json(travelSight);
  }
  async getAllSight(req, res, next) {
    const travel = await TravelSight.findAll();

    return res.json(travel);
  }
}
module.exports = new TravelController();
