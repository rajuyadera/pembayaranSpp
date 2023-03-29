import { Sequelize } from "sequelize";

const db = new Sequelize("spp", "root", "rajuyadera241004", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
