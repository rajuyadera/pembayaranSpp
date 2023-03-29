import express from "express"
import { createAdmin, deleteAdmin, getAdmin, getAdminById, updateAdmin } from "../controller/AdminController.js"

const router = express.Router()

router.get("/admin", getAdmin)
router.get("/admin/:id_admin", getAdminById)
router.post("/admin", createAdmin)
router.patch("/admin/:id_admin", updateAdmin)
router.delete("/admin/:id_admin", deleteAdmin)

export default router