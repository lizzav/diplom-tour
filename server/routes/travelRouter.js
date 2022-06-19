const Router = require("express");
const router = new Router();
const  travelController=require('../controllers/travelController')
const authMiddleware=require('../middleware/authMiddleware')
//роуте
router.get("/sight",authMiddleware,travelController.getAllSight);
router.post("/",authMiddleware,travelController.createOne);
router.get("/",authMiddleware,travelController.getAll);
router.delete("/:id",authMiddleware,travelController.delete);
router.put("/:id",authMiddleware,travelController.put);
router.get("/:id",authMiddleware,travelController.getOne);
router.put("/sight/:id",authMiddleware,travelController.putSight);
router.delete("/sight/:id",authMiddleware,travelController.deleteSight);
router.post("/sight/:id",authMiddleware,travelController.createSight);
///добавить проверку на совподение id
module.exports = router;
