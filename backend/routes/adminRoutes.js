const express = require("express");

const router = express.Router();



const {

  getAdminStats,

  getAllUsers,

  toggleBlockUser,

  updateProfitBonus,

  deleteUser


} = require("../controllers/adminController");



const adminMiddleware = require("../middleware/adminMiddleware");





// Protect all admin routes

router.use(adminMiddleware);







// Admin dashboard stats

router.get(

  "/stats",

  getAdminStats

);







// Get all users

router.get(

  "/users",

  getAllUsers

);







// Block / Unblock user

router.put(

  "/users/:id/block",

  toggleBlockUser

);







// Update profit and bonus

router.put(

  "/users/profit-bonus",

  updateProfitBonus

);







// Delete user

router.delete(

  "/users/:id",

  deleteUser

);







module.exports = router;