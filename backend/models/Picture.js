import { Sequelize } from "sequelize";
import db from "../config/Database.js";
 
const { DataTypes } = Sequelize;
 
const picture = db.define('pictures',{
    image: {
        type: DataTypes.BLOB('long') 
    },
},{
    freezeTableName:true
});
 
(async () => {
    await db.sync();
})();
 
export default picture;