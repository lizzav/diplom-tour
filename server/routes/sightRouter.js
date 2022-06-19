const Router = require("express");
const router = new Router();
const  sightController=require('../controllers/sightController')

const checkRole=require('../middleware/checkRoleMiddleware')
const authMiddleware=require('../middleware/authMiddleware')
//роутер

router.post("/",authMiddleware,checkRole('ADMIN'),sightController.createOne);
router.get("/",sightController.getAll);
router.get("/:id",sightController.getOne);
router.put("/:id",authMiddleware,checkRole('ADMIN'),sightController.put);
router.delete("/:id",authMiddleware,checkRole('ADMIN'),sightController.delete);
router.get("/city/:id",sightController.getCity);
router.post("/photo/:id",authMiddleware,checkRole('ADMIN'),sightController.sendPhoto);
router.put("/photo/:id",authMiddleware,checkRole('ADMIN'),sightController.updatePhoto);
router.delete("/photo/:id",authMiddleware,checkRole('ADMIN'),sightController.deletePhoto);

module.exports = router;
