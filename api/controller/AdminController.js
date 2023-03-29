import argon2 from "argon2";
import Admin from "../models/Admin.js";

// Ambil Semua Data
export const getAdmin = async (req, res) => {
  try {
    const response = await Admin.findAll();
    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: "Kesalahan Sistem" });
  }
};

// Ambil Data Berdasarkan ID
export const getAdminById = async (req, res) => {
  try {
    const response = await Admin.findOne({
      where: {
        id_admin: req.params.id_admin,
      },
    });
    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: "Kesalahan Sistem" });
  }
};

export const createAdmin = async (req, res) => {
  const admin = await Admin.findOne({
    where: {
      email: req.body.email,
    },
  });

  if (admin) return res.status(400).json({ msg: "Username Sudah Terdaftar" });

  const {email, username, password, confPassword, role } = req.body;

  if (password !== confPassword)
    return res
      .status(400)
      .json({ msg: "Password Dan Konfirmasi Password Tidak Sesuai" });

  const hashPassword = await argon2.hash(password);

  try {
    await Admin.create({
      email: email,
      username: username,
      password: hashPassword,
      confPassword: confPassword,
      role: role,
    })
    return res.status(200).json({msg: "Berhasil Menambahkan Admin"})
  } catch (error) {
    console.log(error.message)
  }
};

// Update Admin
export const updateAdmin = async (req, res) => {
  const admin = await Admin.findOne({
    where: {
      id_admin: req.params.id_admin,
    },
  });
  if (!admin) return res.status(404).json({ msg: "Admin Tidak Ditemukan" });

  const { email,username, password } = req.body;

  let hashPassword;
  if (password === "" || password === null) {
    hashPassword = admin.password;
  } else {
    hashPassword = await argon2.hash(password);
  }

  try {
    await Siswa.update(
      {
        email: email,
        username: username,
        password: hashPassword,
      },
      {
        where: {
          id_admin: req.params.id_admin,
        },
      }
    );
    return res.status(200).json({ msg: "Berhasil Mengupdate Admin" });
  } catch (errors) {
    res.status(500).json({ msg: "Kesalahan Sistem" });
  }
};

// Delete Admin
export const deleteAdmin = async (req, res) => {
  const admin = await Admin.findOne({
    where: {
      id_admin: req.params.id_admin,
    },
  });
  if (!admin) return res.status(404).json({ msg: "Admin Tidak Ditemukan" });

  try {
    await Admin.destroy({
      where: {
        id_admin: req.params.id_admin,
      },
    });
    return res.status(200).json({ msg: "Admin Berhasil di Hapus" });
  } catch (error) {
    res.status(500).json({ msg: "Kesalahan Sistem" });
  }
};
