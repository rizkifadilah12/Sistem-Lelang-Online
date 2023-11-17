import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Barang from "./BarangModel.js";
import Masyarakat from "./MasyarakatModel.js";
import Penawaran from "./PenawaranModel.js";
import Users from "./UserModel.js";

const {DataTypes} = Sequelize;

const Lelang = db.define('lelang',{
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
            notEmpty: true
        }
    },
    tgl_mulai:{
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
    tgl_akhir:{
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    harga_awal:{
        type: DataTypes.DOUBLE(15, 2),
  
    },
    status:{
        type: DataTypes.ENUM({
            values: ['open', 'closed','cancel','confirmed']
          }),
          defaultValue : 'open',
        allowNull: false,
     
    },
    created_by:{
        type: DataTypes.INTEGER,
       
      
    },
    masyarakatId:{
        type: DataTypes.INTEGER,
        
      
    },
    harga_akhir:{
        type: DataTypes.DOUBLE(15, 2),
       
       
    },
    confirm_date:{
        type: DataTypes.DATE,
  
    },
},{
    freezeTableName: true
});


Masyarakat.hasMany(Lelang);
Lelang.belongsTo(Masyarakat, {foreignKey: 'masyarakatId'});
Users.hasMany(Lelang);
Lelang.belongsTo(Users, {foreignKey: 'created_by'});
Lelang.associate = function(models) {
    Penawaran.belongsTo(models.Lelang, {foreignKey: 'id'});

}
export default Lelang;