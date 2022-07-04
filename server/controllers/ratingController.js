const ApiError = require("../error/ApiError");
const {
  Rating,
  User,
  Sight,
  Country,
  City,
  Like
} = require("../models/models");

class RatingController {
  async createOne(req, res, next) {
    const { review, grade, sightId } = req.body;
    if (!grade || !req.user.id || !sightId) {
      return next(ApiError.badRequest("Не заполнены обязательные поля"));
    }
    const sight = await Sight.findOne({
      where: { id: sightId }
    });
    if (!sight) {
      return next(
        ApiError.badRequest("Указанной достопримечательности не сушевствует")
      );
    }
    const user = await User.findOne({
      where: { id: req.user.id }
    });
    if (!user) {
      return next(ApiError.badRequest("Пользователь не найден"));
    }
    const rating = await Rating.create({
      review,
      grade,
      userId: req.user.id,
      sightId
    });
    if (!rating) {
      return next(ApiError.internal("Возникла непредвиденная ошибка"));
    }
    return res.json(rating);
  }
  async getOne(req, res, next) {
    let { id } = req.params;
    const rating = await Rating.findAll({
      where: { sightId: id },
      include: [
        { model: User, as: "user" },
        { model: Like, as: "like" }
      ]
    });
    if (!rating) {
      return next(ApiError.internal("Запрашиваемый ресурс не найден"));
    }
    return res.json(rating);
  }
  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const rating = await Rating.findOne({
        where: { id, userId: req.user.id },
        include: [{ model: User, as: "user" }]
      });
      if (rating && req.user.role === "ADMIN") {
        await Rating.destroy({
          where: { id }
        });
        return res.status(200).json({
          message: "Данные удалены."
        });
      }
      return next(ApiError.forbidden("Нет доступа"));
    } catch (e) {
      return next(ApiError.internal("Возникла непредвиденная ошибка"));
    }
  }
  async put(req, res, next) {
    try {
      const { review, grade, sightId, userId } = req.body;
      if (!grade || !req.user.id || !sightId || !userId) {
        return next(ApiError.badRequest("Не заполнены обязательные поля"));
      }
      const sight = await Sight.findOne({
        where: { id: sightId }
      });
      if (!sight) {
        return next(
          ApiError.badRequest("Указанной достопримечательности не сушевствует")
        );
      }
      const { id } = req.params;
      const rating = await Rating.findOne({
        where: { id, userId: req.user.id },
        include: [{ model: User, as: "user" }]
      });
      if (rating || req.user.role === "ADMIN") {
        const newRating = await Rating.update(
          {
            id,
            review,
            grade,
            userId: req.user.id,
            sightId
          },
          {
            where: { id }
          }
        );
        return res.status(200).json(newRating);
      }
      return next(ApiError.forbidden("Нет доступа"));
    } catch (e) {
      return next(ApiError.internal("Возникла непредвиденная ошибка"));
    }
  }
  async createLike(req, res, next) {
    const { id } = req.params;
    const { like } = req.body;
    const rating = await Rating.findOne({
      where: { id }
    });
    if (!rating) {
      return next(ApiError.badRequest("Указанного отзыва не сушевствует"));
    }

    const user = await User.findOne({
      where: { id: req.user.id }
    });
    if (!user) {
      return next(ApiError.badRequest("Пользователь не найден"));
    }

    const oldLikes = await Like.findOne({
      where: { userId: req.user.id, ratingId:id }
    });
    if (oldLikes) {
      return next(ApiError.badRequest("Оценка уже сущевствует"));
    }
    const likes = await Like.create({
      like,
      userId: req.user.id,
      ratingId: id
    });
    if (!likes) {
      return next(ApiError.internal("Возникла непредвиденная ошибка"));
    }
    return res.json(likes);
  }

  async getOneLike(req, res, next) {
    const { id } = req.params;
    const like = await Like.findAll({
      where: { ratingId: id }
    });

    return res.json(like);
  }
  async deleteLike(req, res, next) {
    const { id } = req.params;
    const likes = await Like.findOne({
      where: { id }
    });
    if ((likes?.id === req.user.id || req.user.role === "ADMIN") && likes) {
      await Like.destroy({
        where: { id }
      });


      return res.status(200).json({
        message: "Данные удалены."
      });
    }

    return next(ApiError.forbidden("Нет доступа"));
  }
  async putLike(req, res, next) {
    const { id } = req.params;

    const { like, userId, ratingId } = req.body;
    if (!userId || !ratingId) {
      return next(ApiError.badRequest("Не заполнены обязательные поля"));
    }
    const rating = await Rating.findOne({
      where: { id: ratingId }
    });
    if (!rating) {
      return next(ApiError.badRequest("Указанного отзыва не сушевствует"));
    }
    const likes = await Like.findOne({
      where: { id }
    });
    if ((likes?.id === req.user.id || req.user.role === "ADMIN") && likes) {
      const newLikes = await Like.update(
        {
          id,
          userId,
          ratingId,
          like: like
        },
        {
          where: { id }
        }
      );

      return res.status(200).json(newLikes);
    }

    return next(ApiError.forbidden("Нет доступа"));
  }
}
module.exports = new RatingController();
