import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Penawaran from "./PenawaranModel.js";

const {DataTypes} = Sequelize;

const Barang = db.define('barang',{
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
    deskripsi:{
        type: DataTypes.TEXT,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    harga_awal:{
        type: DataTypes.DOUBLE,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    status:{
        type: DataTypes.ENUM({
            values: ['new', 'process','sold']
          }),
        defaultValue: "new",
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
},{
    freezeTableName: true,
    tableName: 'barang'
});
Barang.associate = function(models) {
    Penawaran.belongsTo(models.Barang, {foreignKey: 'id'});

}
export default Barang;