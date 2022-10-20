import express from "express";
import { getUsers, Register, Login, Logout, RegisterAdmin, Whoami } from "../controllers/Users.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import {  getCars,getCarsById,createCars,updateCars,deleteCars } from "../controllers/Cars.js"
const router = express.Router();
const prefix = "/v1/api/";

router.post(prefix + 'register', Register);
router.post(prefix + 'login', Login);
router.delete(prefix +'logout', Logout);

router.get(prefix + 'token', refreshToken);

router.get(prefix + 'whoami',verifyToken, Whoami)

// endpoint untuk tambah admin yang bisa hanya superadmin
router.post(prefix + 'registrasi-admin', verifyToken, RegisterAdmin);

router.get(prefix + 'users', verifyToken, getUsers);

router.get(prefix + 'cars', verifyToken, getCars);
router.get(prefix + 'car/:id', verifyToken, getCarsById);
router.post(prefix +'car', verifyToken,  createCars);
router.put(prefix + 'car/:id', verifyToken, updateCars);
router.delete(prefix +'car/:id', verifyToken, deleteCars);

export default router;