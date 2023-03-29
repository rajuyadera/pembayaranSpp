import express from "express"
import { createSiswa, deleteSiswa, getSiswa, getSiswaById, updateSiswa } from "../controller/SiswaController.js";

const router = express.Router()

router.get("/siswa", getSiswa);
router.get("/siswa/:nisn", getSiswaById);
router.post("/siswa", createSiswa)
router.patch("/siswa/:nisn", updateSiswa)
router.delete("/siswa/:nisn", deleteSiswa)

export default router