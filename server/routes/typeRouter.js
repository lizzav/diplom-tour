const Router = require("express");
const router = new Router();
const checkRole=require('../middleware/checkRoleMiddleware')
const  typeController=require('../controllers/typeController')
//роутер
router.post("/",checkRole('ADMIN'),typeController.create);
router.get("/",typeController.get);

module.exports = router;
