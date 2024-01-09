import Barang from "../models/BarangModel.js";
import db from "../config/Database.js";
import sequelize from "sequelize";
import Lelang from "../models/LelangModel.js";

export const getLelang = async (req, res) =>{
  console.log(req.userId);
        if(req.role === "petugas"){
            const selectViewSql = `
            SELECT *
            FROM detail_lelang
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
      }
}
export const getPemenangLelang = async(req, res)=>{
    if(req.role === "petugas") {
        const selectViewSql = `
            SELECT *
            FROM pemenang_lelang
                    `;
        // Execute the SQL query to select data from the view
        db
          .query(selectViewSql, { type: sequelize.QueryTypes.SELECT })
          .then((viewData) => { 
            res.status(200).json(viewData);
          })
          .catch((error) => {
            console.error("Failed to select view data:", error);
            res.status(500).json({msg: error.message}); 
          });
      } 
}
export const getPemenangDashboard = async(req, res)=>{
    if(req.role === "petugas") {
        const selectViewSql = `
            SELECT *
            FROM pemenang_lelang where status = "confirmed"
                    `;
        // Execute the SQL query to select data from the view
        db
          .query(selectViewSql, { type: sequelize.QueryTypes.SELECT })
          .then((viewData) => { 
            res.status(200).json(viewData);
          })
          .catch((error) => {
            console.error("Failed to select view data:", error);
            res.status(500).json({msg: error.message}); 
          });
      } 
}
export const getLelangById = async(req, res) =>{
  const selectViewSql = ` 
  SELECT *
  FROM detail_lelang where id_lelang = ${req.params.id}
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
}
export const getForLelang = async(req, res) =>{
  const selectViewSql = ` 
  SELECT *
  FROM lelang_berlangsung
          `;
db
.query(selectViewSql, { type: sequelize.QueryTypes.SELECT })
.then((viewData) => {
  res.status(200).json(viewData);
})
.catch((error) => {
  console.error("Failed to select view data:", error);
});
}
export const getForDetail = async(req, res) =>{
  const selectViewSql = ` 
  SELECT *
  FROM lelang_berlangsung where id_lelang = ${req.params.id}
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
}

export const createLelang = async(req, res) =>{
  const by = req.userId
  const {barangId, tgl_mulai,tgl_akhir} = req.body;
  try {
      await Lelang.create({
          barangId: barangId,
          tgl_mulai: tgl_mulai,
          tgl_akhir: tgl_akhir,
          created_by : by
      });
      res.status(201).json({msg: "Lelang Created Successfuly"});
  } catch (error) {
      res.status(500).json({msg: error.message});
  }
}

export const updateLelang = async(req, res) =>{
  const lelang = await Lelang.findOne({
    attributes: [
      `id`, `uuid`, `barangId`, `tgl_mulai`, `tgl_akhir`, `harga_awal`, `status`, `created_by`, `masyarakatId`, `harga_akhir`, `confirm_date`, `createdAt`, `updatedAt`
    ],
    where:{
        id: req.params.id
    }
});
if(!lelang) return res.status(404).json({msg: "Data tidak ditemukan"});
    const {tgl_mulai,tgl_akhir} = req.body;
    try{
      await Lelang.update({tgl_mulai, tgl_akhir},{
        where:{
            id: lelang.id
        }
    });
    res.status(200).json({msg: "Lelang updated successfuly"});
    }catch (error){
      res.status(500).json({msg: error.message});
    }
}

export const cancel = async(req, res) =>{
  const lelang = await Lelang.findOne({
    attributes: [
      `id`, 
      `uuid`,
      `status`,
      'barangId'
    ],
    where:{
        id: req.params.id
    }

});
if(!lelang) return res.status(404).json({msg: "Data tidak ditemukan"});
    const status = 'cancel'
    try{
      await Lelang.update({
        status: status
      },{
        where:{
            id: lelang.id
        }
    });
    await Barang.update({
      status: 'new'
    },{
      where:{
        id: lelang.barangId
      }
    })
    res.status(200).json({msg: "Lelang updated successfuly"});
    }catch (error){
      res.status(500).json({msg: error.message});
    }
}
export const close = async(req, res) =>{
  const selectViewSql = ` 
  SELECT *
  FROM max_penawaran WHERE id_lelang = ${req.params.id}
  ORDER BY harga_penawaran DESC
LIMIT 1;
          `;
// Execute the SQL query to select data from the view
const lelang = await Lelang.findOne({
  attributes: [
    `id`, 
    `uuid`,
    `status`
  ],
  where:{
      id: req.params.id
  } 
});
const status = 'closed'
db
.query(selectViewSql, { type: sequelize.QueryTypes.SELECT })
.then(async (viewData) => {
    const data = await Lelang.update({
      status: status,
      masyarakatId: viewData[0]?.id_masyarakat,
      harga_akhir:viewData[0]?.harga_penawaran,
    },{
      where:{
          id: lelang.id
      }
  });
  if(data){
    res.status(200).json({msg: "Lelang updated successfuly"});
  }else{
    res.status(500).json({msg: "Failed to close data"});
  }
})
.catch((error) => {
  res.status(500).json({msg: error.message});
});
}
export const confirm = async(req, res) =>{
  const lelang = await Lelang.findOne({
    attributes: [
      `id`, 
      `uuid`,
      `status`,
      'barangId',
      'confirm_date'
    ],
    where:{
        id: req.params.id
    }
});
if(!lelang) return res.status(404).json({msg: "Data tidak ditemukan"});
    const status = 'confirmed'
    const st = "sold"
    const dt = new Date().toLocaleString()
    try{
      await Lelang.update({
        status: status,
        confirm_date: dt
      },{
        where:{
            id: req.params.id
        }
    });
    try {
      await Barang.update({
        status: st
      },{
        where : {
          id : lelang.barangId
        }
      })
    } catch (error) {
      
    }
    res.status(200).json({msg: "Lelang updated successfuly"});
    }catch (error){
      res.status(500).json({msg: error.message});
    }
}

