const Router = require("express");
const router = new Router();
const  errorController=require('../controllers/errorController')
const checkRole=require('../middleware/checkRoleMiddleware')
const authMiddleware=require('../middleware/authMiddleware')
//роутер
router.post("/",errorController.createOne);
router.get("/",authMiddleware,checkRole('ADMIN'),errorController.getAll);
router.get("/:id",authMiddleware,checkRole('ADMIN'),errorController.getOne);
router.put("/:id",authMiddleware,checkRole('ADMIN'),errorController.put);
router.delete("/:id",authMiddleware,checkRole('ADMIN'),errorController.delete);

module.exports = router;
