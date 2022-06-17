const Router = require("express");
const router = new Router();
const  cityController=require('../controllers/cityController')

const checkRole=require('../middleware/checkRoleMiddleware')

const authMiddleware=require('../middleware/authMiddleware')
//роутер
router.post("/",authMiddleware,checkRole('ADMIN'),cityController.createOne);
router.get("/",cityController.getAll);
router.get("/:id",cityController.getOne);
router.put("/:id",authMiddleware,checkRole('ADMIN'),cityController.put);
router.delete("/:id",authMiddleware,checkRole('ADMIN'),cityController.delete);
router.get("/country/:id",cityController.getCountry);

module.exports = router;
