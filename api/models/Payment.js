import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Siswa from "./Siswa.js";
import Admin from "./Admin.js";

const {DataTypes} = Sequelize

const Payment = db.define("pembayaran", {
    id_pembayaran: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nisn: {
        type: DataTypes.INTEGER(11),
        allowNull: false
    },
    id_admin: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    jumlah_bayar: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    bulan_bayar: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tahun_bayar: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    freezeTableName: true
})

Payment.removeAttribute("id")

// Siswa
Siswa.hasMany(Payment,{
    foreignKey: "nisn",
    onDelete: "cascade",
})
Payment.belongsTo(Siswa, {
    foreignKey: "nisn",
    onDelete: "cascade"
})

// Admin
Admin.hasMany(Payment,{
    foreignKey: "id_admin",
    onDelete: "cascade"
})
Payment.belongsTo(Admin, {
    foreignKey: "id_admin",
    onDelete: "cascade"
})




export default Payment