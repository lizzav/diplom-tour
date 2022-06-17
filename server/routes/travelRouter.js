const Router = require("express");
const router = new Router();
const  travelController=require('../controllers/travelController')
const authMiddleware=require('../middleware/authMiddleware')
//роутер
router.post("/",authMiddleware,travelController.createOne);
router.get("/",authMiddleware,travelController.getAll);
router.delete("/:id",authMiddleware,travelController.delete);
router.put("/:id",authMiddleware,travelController.put);
router.get("/:id",authMiddleware,travelController.getOne);
///добавить проверку на совподение id
module.exports = router;
