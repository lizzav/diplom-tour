const Router = require("express");
const router = new Router();
const  brandController=require('../controllers/brandController')
const authMiddleware=require('../middleware/authMiddleware')
//роутер
router.post("/",authMiddleware,brandController.create);
router.get("/",authMiddleware,brandController.getAll);
router.delete("/:id",authMiddleware,brandController.getAll);
router.put("/:id",authMiddleware,brandController.getAll);
router.get("/:id",authMiddleware,brandController.getAll);
///добавить проверку на совподение id
module.exports = router;
