import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";

const {DataTypes} = Sequelize;

const Masyarakat = db.define('masyarakat',{
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            isEmail: true
        }
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    nik:{
        type: DataTypes.CHAR(16),
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
    nama:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    jk:{
        type: DataTypes.ENUM({
            values: ['laki-laki', 'perempuan']
          }),
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    no_hp:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    alamat:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    status:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 1,
        validate:{
            notEmpty: true
        }
    },
    update_by:{
        type: DataTypes.INTEGER,
        allowNull: true,
        validate:{
            notEmpty: true
        }
    }
},{
    freezeTableName: true
});
Users.hasMany(Masyarakat);
Masyarakat.belongsTo(Users, {foreignKey: 'update_by'});

export default Masyarakat;