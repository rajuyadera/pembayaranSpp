import Admin from "../models/Admin.js";
import Kelas from "../models/Kelas.js";
import Payment from "../models/Payment.js";
import Siswa from "../models/Siswa.js";
import Spp from "../models/spp.js";

// Get All Data
export const getPayment = async (req,res) => {
    try {
        const response = await Payment.findAll({
            include: [{
                model: Siswa,
                include: [Kelas, Spp]
            }, Admin]
        })
        return res.status(200).json(response)
    } catch (error) {
        console.log(error.message)
    }
}

// Get Data By Id
export const getPaymentById = async (req,res) => {
    try {
        const response = await Payment.findOne({
            include: [{
                model: Siswa,
                include: [Kelas, Spp]
            }, Admin],
            where: {
                id_pembayaran: req.params.id_pembayaran
            }
        })
        return res.status(200).json(response)
    } catch (error) {
        console.log(error.message)
    }
}


// Get Data By Nisn
export const getPaymentByNisn = async (req,res) => {
    try {
        const response = await Payment.findAll({
            where: {
                nisn: req.params.nisn
            },
            
            include: [{
                model: Siswa,
                include: [Kelas, Spp]
            }, Admin]
        })
        return res.status(200).json(response)
    } catch (error) {
        console.log(error.message)
    }
}

// Create PAyment
export const createPayment = async (req,res) => {
      const { nisn, id_admin, jumlah_bayar, bulan_bayar, tahun_bayar } = req.body;
    
      try {
        await Payment.create({
            nisn: nisn,
            id_admin: id_admin,
            jumlah_bayar: jumlah_bayar,
            bulan_bayar: bulan_bayar,
            tahun_bayar: tahun_bayar,
        });
        return res.status(200).json({ msg: "Berhasil Melakulan Pembayaran" });
      } catch (errors) {
        console.log(errors);
      }
}


// Get All Data
export const updatePayment = async (req,res) => {
    const payment = await Payment.findOne({
        where: {
            id_pembayaran: req.params.id_pembayaran
        }
    })

    if(!payment) return res.status(404).json({msg: "Pembayaran Tidak Ditemukan"})

    const { nisn, id_admin, jumlah_bayar, bulan_bayar, tahun_bayar } = req.body;
    
      try {
        await Payment.update({
            nisn: nisn,
            id_admin: id_admin,
            jumlah_bayar: jumlah_bayar,
            bulan_bayar: bulan_bayar,
            tahun_bayar: tahun_bayar,
        },
        {
            where: {
                id_pembayaran: req.params.id_pembayaran
            }
        });
        return res.status(200).json({ msg: "Berhasil Melakulan Pembayaran" });
      } catch (errors) {
        console.log(errors.message);
      }

}

// Get All Data
export const deletePayment = async (req,res) => {
    try {
        await Payment.destroy({
            where: {
                id_pembayaran: req.params.id_pembayaran
            }
        })
        return res.status(200).json({ msg: "Berhasil Menghapus Pembayaran" });
    } catch (error) {
        console.log(error.message)
    }
}