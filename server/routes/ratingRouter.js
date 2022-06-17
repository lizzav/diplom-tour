const Router = require("express");
const router = new Router();
const  ratingController=require('../controllers/ratingController')
const authMiddleware=require('../middleware/authMiddleware')
//роутер
router.post("/",authMiddleware,ratingController.createOne);
router.get("/:id",ratingController.getOne);
router.delete("/:id",authMiddleware,ratingController.delete);
router.put("/:id",authMiddleware,ratingController.put);
router.post("/like/:id",authMiddleware,ratingController.createLike);
router.put("/like/:id",authMiddleware,ratingController.putLike);
router.delete("/like/:id",authMiddleware,ratingController.deleteLike);
router.get("/like/:id",ratingController.getOneLike);

module.exports = router;
