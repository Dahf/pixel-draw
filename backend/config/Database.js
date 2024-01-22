import { Sequelize } from "sequelize";
 
const db = new Sequelize('drawdb', 'draw-app', 'dtyU8VvejCq50oebdgEP', {
    host: "192.168.0.113",
    port: 13306,
    dialect: "mysql"
});

export default db;