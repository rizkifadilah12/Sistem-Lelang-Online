import { Sequelize } from "sequelize";
import db from "../Config/Database.js";
import Masyarakat from "./MasyarakatModel.js"; 
import Lelang from "./LelangModel.js";

const {DataTypes} = Sequelize;

const Penawaran = db.define('penawaran',{
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    masyarakatId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    lelangId:{
        type: DataTypes.INTEGER,
    },
    tgl_penawaran:{
        type: DataTypes.DATE,
    },
    harga_penawaran:{
        type: DataTypes.DOUBLE(15,2),
    }
},{
    freezeTableName: true
});

Masyarakat.hasMany(Penawaran);
Penawaran.belongsTo(Masyarakat, {foreignKey: 'masyarakatId'});

Lelang.hasMany(Penawaran);
Penawaran.belongsTo(Lelang, {foreignKey: 'lelangId'});
Penawaran.associate = function(models) {
    Penawaran.hasOne(models.Lelang, {foreignKey: 'id',sourceKey: 'id'});
}
Penawaran.associate = function(models) { 
    Penawaran.hasOne(models.Barang, {foreignKey: 'id',sourceKey: 'id'});
}
export default Penawaran;