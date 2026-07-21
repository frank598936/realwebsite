const express = require("express");

const router = express.Router();

const adminMiddleware = require("../middleware/adminMiddleware");


const {

getAllUsers,

toggleBlockUser,

updateUserProfitBonus


}=require("../controllers/userController");




// GET USERS

router.get(
"/",
adminMiddleware,
getAllUsers
);




// BLOCK / UNBLOCK

router.put(
"/block/:user_id",
adminMiddleware,
toggleBlockUser
);




// EDIT PROFIT BONUS

router.put(
"/profit-bonus/:user_id",
adminMiddleware,
updateUserProfitBonus
);



module.exports = router;