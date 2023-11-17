import {Sequelize} from "sequelize";

const db = new Sequelize('lelang_db', 'root', '', {
    host: "localhost",
    dialect: "mysql" 
});

export default db;