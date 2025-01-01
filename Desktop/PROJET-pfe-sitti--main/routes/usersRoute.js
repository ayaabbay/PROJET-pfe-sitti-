const router =require("express").Router();
const { getAllUsersCtrl, getUserProfileCtrl, updateUserProfileCtrl, getUsersCountCtrl, deleteUserProfileCtrl } = require("../controllers/usersController");
const { verifyTokenAndAdmin,verifyTokenAndOnlyUser, verifyTokenAndAuthorization } = require("../middlewares/verifyToken");
const validateObjectId=require("../middlewares/validateObjectId");

// /  api/users/profile
router.route("/profile" ).get(verifyTokenAndAdmin,getAllUsersCtrl);

// /  api/users/profile/:id
router
    .route("/profile/:id" )
    .get(validateObjectId,getUserProfileCtrl)
    .put(validateObjectId,verifyTokenAndOnlyUser,updateUserProfileCtrl)
    .delete(validateObjectId, verifyTokenAndAuthorization, deleteUserProfileCtrl);

// /  api/users/count
router.route("/count" ).get(verifyTokenAndAdmin,getUsersCountCtrl);

module.exports = router;