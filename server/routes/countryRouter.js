const Router = require("express");
const router = new Router();
const  brandController=require('../controllers/brandController')

const checkRole=require('../middleware/checkRoleMiddleware')

const authMiddleware=require('../middleware/authMiddleware')
//роутер
router.post("/",authMiddleware,checkRole('ADMIN'),brandController.create);
router.get("/",brandController.create);
router.get("/:id",brandController.getAll);
router.put("/:id",authMiddleware,checkRole('ADMIN'),brandController.getAll);
router.delete("/:id",authMiddleware,checkRole('ADMIN'),brandController.getAll);

module.exports = router;
