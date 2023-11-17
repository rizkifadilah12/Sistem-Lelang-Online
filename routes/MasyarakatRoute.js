import express from "express";
import { getMasyarakat,updateMasyarakat,getmasyarakatById,blokMasyarakat,createMasyarakat,updatePassword,ublock } from "../controllers/Masyarakat.js";

const router = express.Router();

router.get('/masyarakats', getMasyarakat);
router.get('/masyarakat/:id', getmasyarakatById);
router.post('/masyarakat', createMasyarakat);
router.patch('/masyarakat/:id', updateMasyarakat);
router.patch('/masyarakatblock/:id', blokMasyarakat);
router.patch('/password/:id', updatePassword);
router.patch("/unblock/:id",ublock)

export default router;