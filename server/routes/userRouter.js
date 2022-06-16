const Router = require("express");
const router = new Router();
const  userController=require('../controllers/userController')
const authMiddleware=require('../middleware/authMiddleware')
//роутер
router.post("/registrations",userController.registration);
router.post("/login",userController.login);
router.get("/auth", authMiddleware, userController.check);

module.exports = router;
