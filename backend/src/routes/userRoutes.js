import {Router} from "express"
import { getUserDetails, login, logout, registerUser ,makeUserAdmin} from "../controller/userController.js"
import {upload} from "../middleware/multerMiddleware.js"
import { verifyJwt } from "../middleware/authMiddleware.js";

const router = Router();


router.route("/register").post( upload.single("profile") ,registerUser)
router.route("/login").post(login)
router.route("/logout").post( verifyJwt ,logout)
router.route("/get-user-details").get( verifyJwt ,getUserDetails)
router.route("/make-user-admin").post( verifyJwt ,makeUserAdmin)

export default router
