import argon2 from "argon2";
import Admin from "../models/Admin.js";
import Siswa from "../models/Siswa.js";

// Login Admin
export const loginAdmin = async (req,res) => {
  const admin = await Admin.findOne({
    where: {
      email: req.body.email
    }
  })
  if(!admin) return res.status(404).json({msg: "Admin Tidak Ditemukan"})

  const match = argon2.verify(admin.password, req.body.password)
  if(!match) return res.status(400).json({msg: "Password Salah"})

  req.session.idAdmin = admin.id_admin
  const id_admin = admin.id_admin
  const email = admin.email
  const username = admin.username
  const role = admin.role
  res.status(200).json({id_admin,email, username, role})
}


// Get ME Admin
export const meAdmin = async (req,res) => {
  if(!req.session.idAdmin) return res.status(400).json({msg: "Silahkan Login Terlebih Dahulu"})

  const admin = await Admin.findOne({
    where: {
      id_admin: req.session.idAdmin
    }
  })

  if(!admin) return res.status(404).json({msg: "admin tidak ditemukan"})
  res.status(200).json(admin)
}

// Login Siswa
export const loginSiswa = async (req, res) => {
  const siswa = await Siswa.findOne({
    where: {
      nisn: req.body.nisn,
    },
  });

  if (!siswa) return res.status(404).json({ msg: "Siswa Tidak Ditemukan" });
  if (siswa.nis !== req.body.nis) return res.status(400).json({msg: "Nis Salah"})
  req.session.nisn = siswa.nisn
  const nisn = siswa.nisn
  const nama = siswa.nama
  const nis = siswa.nis
  const alamat = siswa.alamat
  const no_telp = siswa.no_telp
  res.status(200).json({nisn, nama, nis, alamat, no_telp})
};


// Get ME Siswa
export const meSiswa = async (req,res) => {
  if(!req.session.nisn) return res.status(400).json({msg: "Silahkan Login Terlebih Dahulu"})

  const siswa = await Siswa.findOne({
    where: {
      nisn: req.session.nisn
    }
  })

  if(!siswa) return res.status(404).json({msg: "siswa tidak ditemukan"})
  res.status(200).json(siswa)
}



// Logout
export const logout = async (req,res) => {
  req.session.destroy((err) => {
    if(err) return res.status(400).json({msg: "Tidak Dapat Logout"})
    res.status(200).json({msg: "Anda Telah Logout"})
  })
}