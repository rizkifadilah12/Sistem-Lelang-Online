import express from "express";
import {
    getBarang,
    getBarangById,
    updateBarang,
    createBarang,
    DeleteBarang,
    createGambar,
    getGambarById,
    getBarangDrop
} from "../controllers/Barang.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/barangs', getBarang);
router.get('/barang', getBarangDrop);
router.get('/barang/:id',verifyUser, getBarangById);
router.post('/barang',verifyUser, createBarang);
router.get('/gambar/:id',verifyUser, getGambarById);
router.post('/barangss', createGambar);
router.patch('/barang/:id',verifyUser, updateBarang);
router.delete('/barang/:id',verifyUser, DeleteBarang);

export default router;