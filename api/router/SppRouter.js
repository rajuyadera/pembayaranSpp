import express from "express"
import { createSpp, deleteSpp, getSpp, getSppbyId, updateSpp } from "../controller/SppController.js"

const router = express.Router()

router.get("/spp", getSpp)
router.get("/spp/:id_spp", getSppbyId)
router.post("/spp", createSpp)
router.patch("/spp/:id_spp", updateSpp)
router.delete("/spp/:id_spp", deleteSpp)


export default router