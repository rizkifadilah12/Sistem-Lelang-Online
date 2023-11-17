import Barang from "../models/BarangModel.js";
import sequelize from "sequelize";
import db from "../config/Database.js";
import Gambar from "../models/GambarModel.js";
import path from "path";
import fs from "fs";

export const getBarang = async (req, res) => {
  // Define the SQL query to select data from the view
  const selectViewSql = `
            SELECT *
            FROM detail_barang 
                    `;
  // Execute the SQL query to select data from the view
  db.query(selectViewSql, { type: sequelize.QueryTypes.SELECT })
    .then((viewData) => {
      res.status(200).json(viewData);
    })
    .catch((error) => {
      console.error("Failed to select view data:", error);
    });
};
export const getBarangDrop = async (req, res) => {
  // Define the SQL query to select data from the view
  const selectViewSql = `
            SELECT *
            FROM detail_barang Where status = "new"
                    `;
  // Execute the SQL query to select data from the view
  db.query(selectViewSql, { type: sequelize.QueryTypes.SELECT })
    .then((viewData) => {
      // console.log(viewData);
      res.status(200).json(viewData);
    })
    .catch((error) => {
      console.error("Failed to select view data:", error);
    });
};
export const getBarangById = async (req, res) => {
  try {
    const response = await Barang.findOne({
      attributes: ["id", "name", "deskripsi", "harga_awal"],
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Gambar,
          attributes: ["image", "url"],
        },
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const getGambarById = async (req, res) => {
  try {
    const response = await Gambar.findAll({
      attributes: ["uuid", "id", "image", "url"],
      where: {
        barangId: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createBarang = async (req, res) => {
  const { name, harga_awal, deskripsi } = req.body;
  if (req.files === null)
    return res.status(400).json({ msg: "No File Uploaded" });
  const file = req.files.file;
  const fileSize = file.data.length;
  const ext = path.extname(file.name);
  const utama = 1;
  const urutan = 0;
  const fileName = file.md5 + ext;
  const url = `${req.protocol}://${req.get("host")}/barangs/${fileName}`;
  const allowedType = [".png", ".jpg", ".jpeg"];

  if (!allowedType.includes(ext.toLowerCase()))
    return res.status(422).json({ msg: "Invalid Images" });
  if (fileSize > 5000000)
    return res.status(422).json({ msg: "Image must be less than 5 MB" });
  file.mv(`./public/barangs/${fileName}`, async (err) => {
    try {
      const barang = await Barang.create({
        name: name,
        deskripsi: deskripsi,
        harga_awal: harga_awal,
      });
      const id = barang.id;
      await Gambar.create({
        barangId: id,
        image: fileName,
        utama: utama,
        url: url,
        nama_gambar: name,
        urutan: urutan,
      });
      res.status(201).json({ msg: "Data Berhasil Ditambahkan" });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  });
};
export const createGambar = async (req, res) => {
  if (req.files === null)
    return res.status(400).json({ msg: "No File Uploaded" });
  const file = req.files.file;
  const id = req.body.id;
  const fileSize = file.data.length;
  const ext = path.extname(file.name);
  const utama = 0;
  const urutan = 0;
  const fileName = file.md5 + ext;
  const url = `${req.protocol}://${req.get("host")}/barangs/${fileName}`;
  const allowedType = [".png", ".jpg", ".jpeg"];

  if (!allowedType.includes(ext.toLowerCase()))
    return res.status(422).json({ msg: "Invalid Images" });
  if (fileSize > 5000000)
    return res.status(422).json({ msg: "Image must be less than 5 MB" });
  file.mv(`./public/barangs/${fileName}`, async (err) => {
    try {
      console.log(id);
      await Gambar.create({
        barangId: id,
        image: fileName,
        utama: utama,
        url: url,
        nama_gambar: file.name,
        urutan: urutan,
      });
      res.status(201).json({ msg: "Data Berhasil Ditambahkan" });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  });
};

export const updateBarang = async (req, res) => {
  await Barang.findOne({
    where: {
      id: req.params.id,
    },
  });
  const gambar = await Gambar.findOne({
    where: {
      barangId: req.params.id,
    },
  });
  let fileName = "";
  if (req.files === null) {
    fileName = gambar.url;
  } else {
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    fileName = file.md5 + ext;
    const allowedType = [".png", ".jpg", ".jpeg"];

    if (!allowedType.includes(ext.toLowerCase()))
      return res.status(422).json({ msg: "Invalid Images" });
    if (fileSize > 5000000)
      return res.status(422).json({ msg: "Image must be less than 5 MB" });

    const filepath = `./public/barangs/${gambar.image}`;
    fs.unlinkSync(filepath);

    file.mv(`./public/barangs/${fileName}`, (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });
  }
  const { name, deskripsi, harga_awal } = req.body;
  const names = req.body.title;
  const url = `${req.protocol}://${req.get("host")}/barangs/${fileName}`;

  try {
    await Barang.update(
      {
        name: name,
        deskripsi: deskripsi,
        harga_awal: harga_awal,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    await Gambar.update(
      {
        image: fileName,
        url: url,
      },
      {
        where: {
          barangId: req.params.id,
        },
      }
    );
    res.status(200).json({ msg: "Product Updated Successfuly" });
  } catch (error) {
    console.log(error.message);
  }
};

export const DeleteBarang = async (req, res) => {
  const barang = await Barang.findOne({
    where: {
      id: req.params.id,
    },
  });
  const gambar = await Gambar.findOne({
    where: {
      barangId: req.params.id,
    },
  });
  if (!barang) return res.status(404).json({ msg: "Barang tidak ditemukan" });
  try {
    const filepath = `./public/barangs/${gambar.image}`;
    fs.unlinkSync(filepath);
    await Barang.destroy({
      where: {
        id: barang.id,
      },
    });
    res.status(200).json({ msg: "Barang Deleted" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
