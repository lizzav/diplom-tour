const Router = require("express");
const router = new Router();
const  brandController=require('../controllers/brandController')
const checkRole=require('../middleware/checkRoleMiddleware')
const authMiddleware=require('../middleware/authMiddleware')
//роутер
router.post("/",brandController.create);
router.get("/",authMiddleware,checkRole('ADMIN'),brandController.getAll);
router.get("/:id",authMiddleware,checkRole('ADMIN'),brandController.getAll);
router.put("/:id",authMiddleware,checkRole('ADMIN'),brandController.getAll);
router.delete("/:id",authMiddleware,checkRole('ADMIN'),brandController.getAll);

module.exports = router;
