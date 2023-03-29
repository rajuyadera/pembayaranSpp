import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize

const Spp = db.define("spp", {
    id_spp: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tahun_ajaran: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nominal: {
        type: DataTypes.INTEGER,
        allowNull:false,
    }
}, {
    freezeTableName: true
})

export default Spp