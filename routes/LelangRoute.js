import express from "express";
import {
    getLelang,
    getLelangById,
    createLelang,
    updateLelang,
    cancel,
    close,
    getPemenangLelang,
    getForLelang,
    confirm,
    getPemenangDashboard,
    getForDetail
} from "../controllers/Lelang.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/lelangs',verifyUser, getLelang); 
router.get('/menang',verifyUser, getPemenangDashboard)
router.get('/lelang', getForLelang); 
router.get('/lelangDetail/:id',getForDetail)
router.patch('/lelang/confirm/:id', confirm); 
router.get('/lelangss',verifyUser, getPemenangLelang);
router.get('/lelang/:id', getLelangById);
router.post('/lelang',verifyUser, createLelang);
router.patch('/lelang/:id',verifyUser, updateLelang);
router.patch('/lelang/cancel/:id',verifyUser, cancel);
router.patch('/lelang/closed/:id',verifyUser, close);

export default router;