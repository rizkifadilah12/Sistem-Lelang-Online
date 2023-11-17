import express from "express";
import {
    getGambar,
    getGambarById,
    createGambar,
    updateGambar,
    deleteGambar
} from "../controllers/Gambar.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/barangs',verifyUser, getGambar);
router.get('/gambars/:id', getGambarById);
router.post('/barang',verifyUser, createGambar);
router.patch('/barang/:id',verifyUser, updateGambar);
router.delete('/gambar/:id',verifyUser, deleteGambar);

export default router;