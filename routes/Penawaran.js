import express from "express";
import {
    getPenawaran,
    getPenawaranById,
    createPenawaran,
    deletePenawaran,
    getPenawaranByuser,
    getPenawarans,
    getPemenangByUser,
    getMaxPenawaran
} from "../controllers/Penawaran.js";
import {verifyUser1 } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/penawaran/:id', getPenawaran);
router.get('/penawarans', getPenawarans);
router.get('/penawaran/:id',verifyUser1, getPenawaranById);
router.post('/penawaran', createPenawaran);
router.get('/penawaranss', getPenawaranByuser);
router.get('/pemenanguser', getPemenangByUser);
router.get('/penawaranmax/:id' ,getMaxPenawaran);
router.delete('/penawaran/:id',verifyUser1, deletePenawaran);

export default router;