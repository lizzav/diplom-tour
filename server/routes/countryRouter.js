const Router = require("express");
const router = new Router();
const  countryController=require('../controllers/countryController')
const checkRole=require('../middleware/checkRoleMiddleware')

const authMiddleware=require('../middleware/authMiddleware')
//роутер
router.post("/",authMiddleware,checkRole('ADMIN'),countryController.createOne);
router.get("/",countryController.getAll);
router.get("/:id",countryController.getOne);
router.put("/:id",authMiddleware,checkRole('ADMIN'),countryController.put);
router.delete("/:id",authMiddleware,checkRole('ADMIN'),countryController.delete);

module.exports = router;
