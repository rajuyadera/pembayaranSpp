import express from "express"
import { getPayment, createPayment, updatePayment, deletePayment, getPaymentByNisn } from "../controller/PaymentController.js"

const router = express.Router()

router.get("/payment", getPayment)
router.get("/payment/:nisn", getPaymentByNisn)
router.post("/payment", createPayment)
router.patch("/payment/:id_pembayaran", updatePayment)
router.delete("/payment/:id_pembayaran", deletePayment)


export default router