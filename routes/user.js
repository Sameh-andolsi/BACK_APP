const router = require("express").Router();
const devControllers = require("../controllers/devControllers");

router.post("/register", devControllers.Register);
router.post("/login", devControllers.Login);
module.exports = router;
