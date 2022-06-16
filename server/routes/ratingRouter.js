const Router = require("express");
const router = new Router();
const  brandController=require('../controllers/brandController')
const authMiddleware=require('../middleware/authMiddleware')
//роутер
router.post("/",authMiddleware,brandController.create);
router.get("/:id",brandController.getAll);
router.delete("/:id",authMiddleware,brandController.getAll);
router.put("/:id",authMiddleware,brandController.getAll);
router.post("/like/:id",authMiddleware,brandController.getAll);
router.put("/like/:id",authMiddleware,brandController.getAll);
router.delete("/like/:id",authMiddleware,brandController.getAll);
router.get("/like/:id",brandController.getAll);

module.exports = router;
