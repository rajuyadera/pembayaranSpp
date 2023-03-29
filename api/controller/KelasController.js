import Kelas from "../models/Kelas.js";

// Ambil Semua Data Kelas
export const getKelas = async (req, res) => {
  try {
    const response = await Kelas.findAll();
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
};

// Ambil Data Kelas Berdasarkan ID
export const getKelasById = async (req, res) => {
  try {
    const response = await Kelas.findOne({
      where: {
        id_kelas: req.params.id_kelas,
      },
    });
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
};

// Menambahkan Data Kelas
export const createKelas = async (req, res) => {
  const { kelas, jurusan } = req.body;
  try {
    await Kelas.create({
      kelas: kelas,
      jurusan: jurusan,
    });
    return res.status(200).json({ msg: "Berhasil Menambahkan Kelas" });
  } catch (error) {
    console.log(error);
  }
};

// Mengupdate Data Kelas
export const updateKelas = async (req, res) => {
  const findKelas = await Kelas.findOne({
    where: {
      id_kelas: req.params.id_kelas,
    },
  });

  if (!findKelas) return res.status(404).json({ msg: "Kelas Tidak Terdaftar" });

  const { kelas, jurusan } = req.body;
  try {
    await Kelas.update(
      {
        kelas: kelas,
        jurusan: jurusan,
      },
      {
        where: {
          id_kelas: req.params.id_kelas,
        },
      }
    );
    return res.status(200).json({ msg: "Berhasil Mengupdate Kelas" });
  } catch (error) {
    console.log(error);
  }
};

// Menghapus Data Kelas
export const deleteKelas = async (req, res) => {
  const findKelas = await Kelas.findOne({
    where: {
      id_kelas: req.params.id_kelas,
    },
  });

  if (!findKelas) return res.status(404).json({ msg: "Kelas Tidak Terdaftar" });

  try {
    await Kelas.destroy({
      where: {
        id_kelas: req.params.id_kelas,
      },
    });
    return res.status(200).json({ msg: "Kelas Berhasil Dihapus" });
  } catch (error) {
    console.log(error)
  }

}
