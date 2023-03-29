import express from "express";
import { createKelas, deleteKelas, getKelas, getKelasById, updateKelas } from "../controller/KelasController.js";

const router = express.Router();

router.get("/kelas", getKelas);
router.get("/kelas/:id_kelas", getKelasById);
router.post("/kelas", createKelas);
router.patch("/kelas/:id_kelas", updateKelas);
router.delete("/kelas/:id_kelas", deleteKelas);

export default router;
