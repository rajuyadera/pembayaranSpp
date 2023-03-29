import Spp from "../models/spp.js";

// Ambil Data Spp
export const getSpp = async (req, res) => {
  try {
    const response = await Spp.findAll();
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
};

// Ambil Data Spp berdasarkan id
export const getSppbyId = async (req, res) => {
  try {
    const response = await Spp.findOne({
      where: {
        id_spp: req.params.id_spp,
      },
    });
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
};

// Insert Data Spp
export const createSpp = async (req, res) => {
  const { tahunAjaran, nominal } = req.body;

  try {
    await Spp.create({
      tahun_ajaran: tahunAjaran,
      nominal: nominal,
    });
    return res.status(200).json({ msg: "Berhasil Menambahkan Spp" });
  } catch (error) {
    console.log(error);
  }
};

// Update Data Spp
export const updateSpp = async (req, res) => {
  const spp = await Spp.findOne({
    where: {
      id_spp: req.params.id_spp,
    },
  });

  if (!spp) return res.status(404).json({ msg: "Spp Tidak Ditemukan" });
  const { tahunAjaran, nominal } = req.body;

  try {
    await Spp.update(
      {
        tahun_ajaran: tahunAjaran,
        nominal: nominal,
      },
      {
        where: {
          id_spp: req.params.id_spp,
        },
      }
    );

    return res.status(200).json({ msg: "Spp Berhasil Di Update" });
  } catch (error) {
    console.log(error);
  }
};

// Delete Data Spp
export const deleteSpp = async (req, res) => {
  const spp = await Spp.findOne({
    where: {
      id_spp: req.params.id_spp,
    },
  });

  if (!spp) return res.status(404).json({ msg: "Spp Tidak Ditemukan" });

  try {
    await Spp.destroy({
      where: {
        id_spp: req.params.id_spp,
      },
    });
    return res.status(200).json({ msg: "Spp Berhasil Dihapus" });
  } catch (error) {
    console.log(error);
  }
};
