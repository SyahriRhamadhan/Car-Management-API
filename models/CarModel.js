import { Sequelize } from "sequelize";
import db from "../config/Database.js";
 
const { DataTypes } = Sequelize;
 
const Cars = db.define('cars',{
    name:{
        type: DataTypes.STRING
    },
    harga:{
        type: DataTypes.STRING
    },
    size:{
        type: Sequelize.STRING
    },
    createBy:{
        type: Sequelize.STRING
    },
    updateBy:{
        type: Sequelize.STRING
    },
    createdAt: {
        allowNull: false,
        type: Sequelize.DATE
    },
    updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
    }
},{
    freezeTableName:true
});
 
(async () => {
    await db.sync();
})();
 
export default Cars;