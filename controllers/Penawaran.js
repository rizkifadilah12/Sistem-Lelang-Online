import User from "../models/UserModel.js";
import Penawaran from "../models/PenawaranModel.js";
import Masyarakat from "../models/MasyarakatModel.js";
import Barang from "../models/BarangModel.js";
import db from "../config/Database.js";
import sequelize from "sequelize";
import Lelang from "../models/LelangModel.js";
export const getPenawaran = async (req, res) => { 
    const selectViewSql = `
        SELECT *
        FROM detail_penawaran where id_lelang = ${req.params.id} 
        ORDER BY harga_penawaran DESC
                `;
    // Execute the SQL query to select data from the view
    db
      .query(selectViewSql, { type: sequelize.QueryTypes.SELECT })
      .then((viewData) => {
        res.status(200).json(viewData);
      })
      .catch((error) => {
        console.error("Failed to select view data:", error);
      });
};
export const getPenawarans = async (req, res) => { 
    const selectViewSql = `
        SELECT *
        FROM detail_penawaran
                `;
    db
      .query(selectViewSql, { type: sequelize.QueryTypes.SELECT })
      .then((viewData) => {
        res.status(200).json(viewData);
      })
      .catch((error) => {
        console.error("Failed to select view data:", error);
      });
};

export const getPenawaranById = async (req, res) => {};

export const createPenawaran = async (req, res) => {
  const {harga_penawaran,lelangId} = req.body;
  const data = await Lelang.findOne({
    attributes: ['harga_awal'],
    where :{
      id: lelangId
    }
  })
  const val = data.harga_awal
  const by = req.session.userId
  if(harga_penawaran < val) return res.status(400).json({msg: "Tawaran Anda Harus Lebih Tinggi Dari Harga Awal"})
  if(!by) return res.status(400).json({msg: "Login terlebih dahulu"})
  try {
      await Penawaran.create({
          masyarakatId: by,
          lelangId: lelangId,
          harga_penawaran: harga_penawaran,
      });
      res.status(201).json({msg: "Penawaran Created Successfuly"});
  } catch (error) {
      res.status(500).json({msg: error.message});
  }
};

export const getPenawaranByuser = async (req, res) => {
  const idMasyarakat = req.session.userId
   const selectViewSql = `
        SELECT *
        FROM detail_penawaran where id_masyarakat = ${idMasyarakat}
                `;
    // Execute the SQL query to select data from the view
    db
      .query(selectViewSql, { type: sequelize.QueryTypes.SELECT })
      .then((viewData) => {
        res.status(200).json(viewData);
      })
      .catch((error) => {
        console.error("Failed to select view data:", error);
      });
};
export const getPemenangByUser = async (req, res) => {
  const idMasyarakat = req.session.userId
   const selectViewSql = `
        SELECT *
        FROM pemenang_lelang where id_masyarakat = ${idMasyarakat}
                `;
    // Execute the SQL query to select data from the view
    db
      .query(selectViewSql, { type: sequelize.QueryTypes.SELECT })
      .then((viewData) => {
        res.status(200).json(viewData);
      })
      .catch((error) => {
        console.error("Failed to select view data:", error);
      });
};

export const deletePenawaran = async (req, res) => {
  
};
export const getMaxPenawaran = async (req, res) => {
  const selectViewSql = `
  SELECT *
  FROM get_max_penawaran where id_lelang = ${req.params.id}
          `;
db
.query(selectViewSql, { type: sequelize.QueryTypes.SELECT })
.then((viewData) => {
  res.status(200).json(viewData);
})
.catch((error) => {
  console.error("Failed to select view data:", error);
});
console.log(selectViewSql);
};
