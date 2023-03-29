import express from "express";
import {  loginAdmin, loginSiswa, logout, meAdmin, meSiswa } from "../controller/AuthController.js";

const router = express.Router()

router.get("/meadmin", meAdmin)
router.get("/mesiswa", meSiswa)
router.post("/loginsiswa", loginSiswa)
router.post("/loginadmin", loginAdmin)
router.delete("/logout", logout)


export default router