import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Kelas from "./Kelas.js";
import Spp from "./spp.js";

const { DataTypes } = Sequelize;

const Siswa = db.define(
  "siswa",
  {
    nisn: {
      type: DataTypes.INTEGER(11),
      autoIncrement: true,
      primaryKey: true,
      unique: true
    },
    id_kelas: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_spp: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    nama: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    nis: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    alamat: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    no_telp: {
      type: DataTypes.STRING(13),
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

Siswa.removeAttribute("id");

Siswa.hasOne(Kelas, {
  foreignKey: "id_kelas",
  as: 'kelas',
  onDelete: "cascade"
})
Siswa.belongsTo(Kelas,{
    foreignKey: "id_kelas",
  onDelete: "cascade"
 });


 Siswa.hasMany(Spp, {
  foreignKey: "id_spp",
  as: 'spp',
  onDelete: "cascade"
 })
 Siswa.belongsTo(Spp, {
  foreignKey: "id_spp",
  onDelete: "cascade"
 })



export default Siswa;
