import Siswa from "../models/Siswa.js";
import Kelas from "../models/Kelas.js";
import Spp from "../models/spp.js";

// Ambil Data Semua Siswa
export const getSiswa = async (req, res) => {
  try {
    const response = await Siswa.findAll({
      attributes: ["nisn", "nama", "nis", "alamat", "no_telp"],
      include: [Kelas, Spp],
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
};

// Ambil Data Siswa Berdasarkan ID
export const getSiswaById = async (req, res) => {
  try {
    const response = await Siswa.findOne({
      where: {
        nisn: req.params.nisn,
      },
      attributes: ["nisn", "nama", "nis", "alamat", "no_telp"],
      include: [Spp, Kelas],
    });
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
};

// Menambahkan Data Siswa
export const createSiswa = async (req, res) => {
  const nisnSiswa = await Siswa.findOne({
    where: {
      nisn: req.body.nisn,
    },
  });
  const namaSiswa = await Siswa.findOne({
    where: {
      nama: req.body.nama,
    },
  });

  if (nisnSiswa) return res.status(400).json({ msg: "NISN Sudah Terdaftar" });
  if (namaSiswa)
    return res.status(400).json({ msg: "Nama Siswa Sudah Terdaftar" });

  const { nisn, id_kelas, id_spp, nama, nis, no_telp, alamat } = req.body;

  try {
    await Siswa.create({
      nisn: nisn,
      id_kelas: id_kelas,
      id_spp: id_spp,
      nama: nama,
      nis: nis,
      alamat: alamat,
      no_telp: no_telp,
    });
    return res.status(200).json({ msg: "Berhasil Menambahkan Siswa" });
  } catch (errors) {
    console.log(errors);
  }
};

// Mengupdate Data Siswa
export const updateSiswa = async (req, res) => {
  const siswa = await Siswa.findOne({
    where: {
      nisn: req.params.nisn,
    },
  });

  if (!siswa) return res.status(404).json({ msg: "Siswa Tidak Ditemukan" });

  const { nisn, id_kelas, id_spp, nama, nis, no_telp, alamat } =
    req.body;

  try {
    await Siswa.update(
      {
        nisn: nisn,
        id_kelas: id_kelas,
        id_spp: id_spp,
        nama: nama,
        nis: nis,
        alamat: alamat,
        no_telp: no_telp,
      },
      {
        where: {
          nisn: req.params.nisn,
        },
      }
    );
    return res.status(200).json({ msg: "Berhasil Mengupdate Siswa" });
  } catch (errors) {
    console.log(errors);
  }
};

// Menghapus Data Siswa
export const deleteSiswa = async (req, res) => {
  const siswa = await Siswa.findOne({
    where: {
      nisn: req.params.nisn,
    },
  });

  if (!siswa) return res.status(404).json({ msg: "Siswa Tidak Ditemukan" });
  try {
    await Siswa.destroy({
      where: {
        nisn: req.params.nisn,
      },
    });
    return res.status(200).json({ msg: "Siswa Berhasil Dihapus" });
  } catch (error) {
    console.log(error);
  }
};
