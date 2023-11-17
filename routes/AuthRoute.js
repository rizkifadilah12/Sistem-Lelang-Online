import express from "express";
import {Login, logOut, Me,LoginFront, MeFront} from "../controllers/Auth.js";

const router = express.Router();

router.get('/me', Me);
router.get('/mefront', MeFront);
router.post('/loginfront', LoginFront);
router.post('/login', Login);
router.delete('/logout', logOut);

export default router; 