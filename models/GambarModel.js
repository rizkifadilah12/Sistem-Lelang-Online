import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Barang from "./BarangModel.js";

const {DataTypes} = Sequelize;

const Gambar = db.define('gambar',{
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    barangId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true,
            
        }
    },
    image:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
    utama:{
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    url: {
        type: DataTypes.STRING
    },
    nama_gambar: {
        type: DataTypes.STRING
    },
    urutan: {
        type: DataTypes.INTEGER
    }
},{
    freezeTableName: true
});
Barang.hasMany(Gambar);
Gambar.belongsTo(Barang, {foreignKey: 'barangId'});
export default Gambar;